export const isAuth = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        return res.status(401).send({message: "Authentication failed"});
    }
}