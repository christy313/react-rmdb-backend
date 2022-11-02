const handleSignup = (req, res, db, bcrypt) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json("Something went wrong");
  }

  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);

  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            username: username,
            email: loginEmail[0].email,
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to sign up"));
};

module.exports = {
  handleSignup,
};
