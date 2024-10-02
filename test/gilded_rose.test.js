const {Shop, Item} = require("../src/gilded_rose");

describe("Item", () => {
	test("should assert name, sellIn and quality properties", () => {	
		expect(() => new Item()).toThrow('name should be a string')
		expect(() => new Item('beer')).toThrow('sellIn should be a number')
		expect(() => new Item('beer', 2)).toThrow('quality should be a number >= 0')
		expect(() => new Item('beer', 0, -1)).toThrow('quality should be a number >= 0')
		
		const item = new Item('beer', 1, 2)
		expect(item.name).toBe('beer')
		expect(item.sellIn).toBe(1)
		expect(item.quality).toBe(2)
	})
})

describe("Gilded Rose", () => {	
	test("sellIn of an item decreases by 1", () => {
		const shop = new Shop([new Item('beer', 0, 1)])
		const beer = shop.items[0]
		shop.updateQuality()
		expect(beer.sellIn).toBe(-1)
	})

	test("the quality of a regular item decreases by 1", () => {
		const shop = new Shop([new Item('beer', 0, 1)])
		shop.updateQuality()
		expect(shop.items[0].quality).toBe(0)
	})

	test("the quality of an item cannot go lower than 0", () => {
		const shop = new Shop([new Item('beer', 0, 1)])
		shop.updateQuality()
		shop.updateQuality()
		expect(shop.items[0].quality).toBe(0)
	})

	test("the quality of an item cannot go higher than 50", () => {
		const shop = new Shop([new Item('Aged Brie', 0, 49)])
		shop.updateQuality()
		shop.updateQuality()
		expect(shop.items[0].quality).toBe(50)
	})
	
	test("the quality of an item past its sellIn date decreases twice as fast", () => {
		const shop = new Shop([new Item('beer', 1, 3)])
		const beer = shop.items[0]

		shop.updateQuality()
		expect(beer.sellIn).toBe(0)
		expect(beer.quality).toBe(2)

		shop.updateQuality()
		expect(beer.sellIn).toBe(-1)
		expect(beer.quality).toBe(0)
	})

	test("Aged Brie increases in quality the older it gets", () => {
		const shop = new Shop([new Item('Aged Brie', 2, 3)])
		const cheese = shop.items[0]
		shop.updateQuality()
		expect(cheese.quality).toBe(4)
	})

	test("Backstage passess quality increases as the concert day approaches, and drops to 0 after", () => {
		const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10)])
		const passes = shop.items[0]

		shop.updateQuality()
		expect(passes.quality).toBe(11)

		shop.updateQuality()
		expect(passes.quality).toBe(13)

		shop.updateQuality()
		shop.updateQuality()
		shop.updateQuality()
		shop.updateQuality()
		
		expect(passes.quality).toBe(21)

		shop.updateQuality()
		expect(passes.quality).toBe(24)

		shop.updateQuality()
		shop.updateQuality()
		shop.updateQuality()
		shop.updateQuality()
		expect(passes.quality).toBe(36)
		
		shop.updateQuality()
		expect(passes.quality).toBe(0)
	})

	test("Sulfuras never changes its quality or sellIn", () => {	
		const shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 100, 100)])
		const sulfuras = shop.items[0]
		shop.updateQuality()
		expect(sulfuras.sellIn).toBe(100)
		expect(sulfuras.quality).toBe(100)
	})

	test("Conjured items degrade in quality twice as fast", () => {
		const shop = new Shop([new Item('Conjured Mana Cake', 1, 12)])
		cake = shop.items[0]
		shop.updateQuality()
		expect(cake.quality).toBe(10)

		shop.updateQuality()
		expect(cake.quality).toBe(6)
	})
})
