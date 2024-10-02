const invariant = (expression, message) => {
	if (expression === false) {
		throw new Error(message)
	}
}

class Item {		
	constructor(name, sellIn, quality) {
		invariant(typeof name === "string", "name should be a string")
		invariant(typeof sellIn === "number", "sellIn should be a number")
		invariant(typeof quality === "number" && quality >= 0, "quality should be a number >= 0")
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}

class Shop {
	constructor(items=[]) {
    	this.items = items;
	}

	updateQuality() {
		for (let item of this.items) {
			switch(item.name) {
				case "Sulfuras, Hand of Ragnaros":
					continue
				case "Backstage passes to a TAFKAL80ETC concert":
					if(item.sellIn <= 0) item.quality = 0
					else if(item.sellIn <= 5) item.quality += 3
					else if(item.sellIn <= 10) item.quality += 2
					else item.quality += 1
					break
				case "Aged Brie":
					item.quality += 1
					break
				default:
					if(item.sellIn <= 0) item.quality -= 2
					else item.quality -= 1
			}

			if(item.quality < 0) item.quality = 0
			if(item.quality > 50) item.quality = 50
			item.sellIn -= 1
		}

		return this.items
	}
}

module.exports = {
	Item,
	Shop
}
