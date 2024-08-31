exports.Add = (req, res) => {
    const { nomeDono, nomePet, telefoneDono, descricao, Data, Hora } = req.body;
    
    if(!nomeDono || !nomePet || !telefoneDono  || Data || Hora) {
        return
    }

    

    
}
