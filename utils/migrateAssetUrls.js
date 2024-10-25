const db = require('../database/models');

const migrateUrls = async () => {
    for (let i=1; i<=6; i++) {
        const layout = await db.Layout.findOne({
            where: {
                id: i
            }
        });

        const updatedElements = layout.layout_data.map(el => {
            if ((el.type === 'image' || el.type === 'text') && el.url) {
                const newUrl = el.url.replace('tomm88', 'presets');
                const newElement = {
                    ...el,
                    url: newUrl
                }
                return newElement
            }
            if (el.type === 'config' && el.soundUrl) {
                const newUrl = el.soundUrl.replace('tomm88', 'presets');
                const newElement = {
                    ...el,
                    soundUrl: newUrl
                }
                return newElement
            }
            return el;
        })

        await layout.update({
            layout_data: updatedElements
        })
    }
}

module.exports = migrateUrls;