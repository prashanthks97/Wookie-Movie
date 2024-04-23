const UserSchema = require("../Model/schema");
const Movie = require("../Model/homeSchema");

const signJswtToken = require("../Config/jwt.config");

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if ((!userName, !password)) {
      return res.status(400).send({ message: "please enter all fields" });
    }
    const existinguser = await UserSchema.findOne({ userName: userName });

    if (!existinguser) {
      return res.status(401).send({ message: "user does not exists" });
    }
    if (password !== existinguser.password) {
      return res.status(401).send({ message: "Email or password incorrect" });
    }
    let user = existinguser.toJSON();

    let token = signJswtToken(user);
    if (token) {
      return res.status(200).send({ message: "User logged in ", token: token });
    } else {
      return res.status(200).send({ message: "token not generated " });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err });
  }
};

exports.create = async (req, res) => {
  const { userName, password, confirmPassword } = req.body;

  if (!userName || !password || !confirmPassword) {
    return res.status(400).send({ message: "please enter all fields" });
  }
  try {
    const existinguser = await UserSchema.findOne({ userName: userName });
    console.log(existinguser);
    if (existinguser) {
      return res.status(409).send({ message: "user already exists" });
    }
    const newUser = await UserSchema.create({
      userName,
      password,
      confirmPassword,
    });
    console.log(newUser);
    return res.status(200).send({ user: newUser, message: "user created" });
  } catch (err) {
    console.log(err);
    return res.status(500).send(`${err}`);
  }
};

exports.home = async (req, res) => {
  try {
    if (req.user) {
      let movies = await Movie.find();
      const emtArr = [];
      if (movies?.length) {
        for (let i = 0; i < movies.length; i++) {
          if (emtArr.length == 0) {
            movies[i].genres?.map((genre) => {
              let newObj = {
                category: genre,
                movies: [
                  {
                    _id: movies[i]._id,
                    director: movies[i].director,
                    imdb_rating: movies[i].imdb_rating,
                    length: movies[i].length,
                    poster: movies[i].poster,
                    title: movies[i].title,
                    slug: movies[i].slug,
                  },
                ],
              };
              emtArr.push(newObj);
            });
          } else {
            if (movies[i]?.genres) {
              movies[i].genres.map((genre) => {
                // let index = emtArr.indexOf(genre)
                const findIndexofGenre = (nameOfGenre) => {
                  let genreCheck = false;
                  let genreIndex = 0;
                  for (let j = 0; j < emtArr.length; j++) {
                    if (nameOfGenre == emtArr[j].category) {
                      genreCheck = true;
                      genreIndex = j;
                    }
                  }
                  if (genreCheck) {
                    return genreIndex;
                  } else {
                    return null;
                  }
                };
                let check = findIndexofGenre(genre);
                console.log("check Response", check);
                if (check == null) {
                  let newObj = {
                    category: genre,
                    movies: [
                      {
                        _id: movies[i]._id,
                        director: movies[i].director,
                        imdb_rating: movies[i].imdb_rating,
                        length: movies[i].length,
                        poster: movies[i].poster,
                        title: movies[i].title,
                        slug: movies[i].slug,
                      },
                    ],
                  };
                  emtArr.push(newObj);
                } else {
                  emtArr[check].movies.push({
                    _id: movies[i]._id,
                    director: movies[i].director,
                    imdb_rating: movies[i].imdb_rating,
                    length: movies[i].length,
                    poster: movies[i].poster,
                    title: movies[i].title,
                    slug: movies[i].slug,
                  });
                }
              });
            }
          }
        }
      }
      // console.log(emtArr);

      return res.status(200).send({ emtArr });
    }
    console.log(req.user);
    return res.status(400).send({ message: "user not verified" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err });
  }
};

exports.movie = async (req, res) => {
  try {
    if (req.user) {
      let singleMovies = await Movie.findOne({
        _id: req.params.id,
      });
      return res.status(200).send({ data: singleMovies });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err });
  }
};

exports.search = async (req, res) => {
  try {
    if (req.user) {
      let searchMovie = await Movie.find({
        $text: { $search: req.params.searchterm },
      });
      console.log(searchMovie);
      return res.status(200).send({ searchMovie });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err });
  }
};
