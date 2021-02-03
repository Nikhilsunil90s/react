
const db = require("../models")
const Menu = db.Menu

async function addFields() {
    const menus = [
        { 'title': 'home', 'url': '/', 'mode': 'url', 'menuOrder': 1 },
        { 'title': 'courses', 'url': '/courses', 'mode': 'url', 'menuOrder': 2 },
        { 'title': 'blog', 'url': '/blog', 'mode': 'url', 'menuOrder': 3 },


    ]


    for (let i = 0; i < menus.length; i++) {

        let menuExists = await Menu.findOne({ where: { title: menus[i].title } })

        if (menuExists) {
            break;
        }

        const menu = new Menu({
            title: menus[i].title,
            url: menus[i].url,
            mode: menus[i].mode,
            menuOrder: menus[i].menuOrder
        });

        try {
            await menu.save();
            console.log('Menu Created successfully')
        } catch (err) {
            console.log('Error in creating default menus')
        }
    }
}

addFields()

exports.index = async (req, res) => {

    try {
        let menu = await Menu.findAll({
            order: [
                ['menuOrder', 'ASC',],
            ],
        })
        res.json(menu);
    } catch (err) {
        res.json({ error: err.message });
    }
}

exports.show = async (req, res) => {

    const isNum = isNumeric(req.params.id)
    let menu

    try {
        if (isNum) {
            menu = await Menu.findOne({
                where: { id: req.params.id }
            })
        }
        else {
            menu = await Menu.findOne({
                where: { url: '/' + req.params.id }
            })
        }
        res.json(menu);
    } catch (err) {
        res.json({ error: err.message });
    }
}

exports.store = async (req, res) => {


    const menu = new Menu({
        title: req.body.title,
        url: req.body.url,
        mode: req.body.mode,
        menuOrder: req.body.menuOrder

    });

    try {
        await menu.save();
        res.json({ success: 'Menu Created successfully' })
    } catch (err) {
        res.json({ error: err.message });
    }

}

exports.update = async (req, res) => {

    let menu

    try {
        menu = await Menu.findByPk(req.params.id)
    } catch (err) {
        res.json({ error: err.message })
        return
    }

    const menuOrder = menu.menuOrder

    let swapMenu = await Menu.findOne({
        where: { menuOrder: req.body.menuOrder }
    })


    menu.title = req.body.title
    menu.url = req.body.url
    menu.mode = req.body.mode
    menu.menuOrder = req.body.menuOrder
    try {
        await menu.save();


        swapMenu.menuOrder = menuOrder
        await swapMenu.save()

        res.json({ success: 'Menu edited' })
    } catch (err) {
        res.json({ error: err.message });
    }

}



exports.destroy = async (req, res) => {

    let menu

    try {
        menu = await Menu.findByPk(req.params.id);
    } catch (err) {
        res.json({ error: err.message })
        return
    }

    try {
        await menu.destroy()
        res.json({ success: 'Menu deleted' })
    } catch (err) {
        res.json({ error: err.message });
    }
}

const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
