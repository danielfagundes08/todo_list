module.exports = {
    validaBody: (req, res, next) => {
        const { body } = req;

        if (body.titulo === undefined) {
            return res.status(404).json({message:'O campo "Título" não pode estar vazio'});
        }

        if (body.titulo === '') {
            return res.status(404).json({message:'O campo "Título" não pode estar vazio'});
        }
        next();
    }
}