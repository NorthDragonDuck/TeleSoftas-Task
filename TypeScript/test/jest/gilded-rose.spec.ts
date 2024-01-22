import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
  
  describe('Tests for "Regular items"', () => {
    it('should decrease quality by 1 for regular items', () => {
      const gildedRose = new GildedRose([new Item('regular', 10, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(9);
    });
    
    it('should decrease sellIn by 1 for regular items', () => {
      const gildedRose = new GildedRose([new Item('regular', 10, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(9);
    });
    
    it('should decrease quality by 1 before sellIn date', () => {
      const gildedRose = new GildedRose([new Item('regular', 10, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(9);
      expect(gildedRose.items[0].sellIn).toBe(9);
    });
    
    it('should decrease quality by 2 after sellIn date passed', () => {
      const gildedRose = new GildedRose([new Item('regular', 0, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(8);
      expect(gildedRose.items[0].sellIn).toBe(-1);
    });
    
    it('should not decrease quality below 0', () => {
      const gildedRose = new GildedRose([new Item('regular', 10, 0)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
      expect(gildedRose.items[0].sellIn).toBe(9);
    });
    
    it('should not decrease quality below 0 after sellIn date passed', () => {
      const gildedRose = new GildedRose([new Item('regular', 0, 1)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
      expect(gildedRose.items[0].sellIn).toBe(-1);
    });
    
    it('should decrease quality by 2 after sellIn date passed', () => {
      const gildedRose = new GildedRose([new Item('regular', 0, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(8);
      expect(gildedRose.items[0].sellIn).toBe(-1);
    });
    
    it('should decrease quality but not below 0 when sellIn date has passed', () => {
      const gildedRose = new GildedRose([new Item('regular', -1, 1)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
      expect(gildedRose.items[0].sellIn).toBe(-2);
    });
  });
  
  describe('Tests for "Aged Brie"', () => {
    it('should increase quality by 1 for Aged Brie and decrease sellIn date by 1', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(11);
      expect(gildedRose.items[0].sellIn).toBe(9);
    });
    
    it('should increase quality by 2 for Aged Brie after sellIn date passed', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(12);
      expect(gildedRose.items[0].sellIn).toBe(-1);
    });
    
    it('should not increase quality above 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(50);
      expect(gildedRose.items[0].sellIn).toBe(9);
    });
    
    it('should not increase quality above 50 after sellIn date passed', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 49)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(50);
      expect(gildedRose.items[0].sellIn).toBe(-1);
    });
    
    it('should not increase quality above 50 even after multiple updates', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', -10, 49)]);
      for (let i = 0; i < 5; i++) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[0].quality).toBe(50);
      expect(gildedRose.items[0].sellIn).toBe(-15);
    });
  });

  describe('Tests for Backstage passes', () => {
    it('quality should increase by 1 when there are more than 10 days to sell', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(11);
      expect(gildedRose.items[0].sellIn).toBe(10);
    });
    
    it('quality should increase by 2 when there are 10 days or less to sell', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(12);
      expect(gildedRose.items[0].sellIn).toBe(9);
    });
    
    it('quality should increase by 2 when there are between 6 and 10 days to sell', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(12);
      expect(gildedRose.items[0].sellIn).toBe(5);
    });
    
    it('quality should increase by 3 when there are 5 days or less to sell', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(13);
      expect(gildedRose.items[0].sellIn).toBe(4);
    });
    
    it('quality should drop to 0 after sellIn date passed', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
      expect(gildedRose.items[0].sellIn).toBe(-1);
    });
    
    it('quality should not increase above 50 when close to the sellIn date', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(50);
      expect(gildedRose.items[0].sellIn).toBe(4);
    });
    
    it('quality should remain at 50 when sellIn is below 5 and quality is already 50', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 50)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(50);
      expect(gildedRose.items[0].sellIn).toBe(4);
    });
    
    it('quality should be 0 when sellIn is below 0', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', -1, 50)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
      expect(gildedRose.items[0].sellIn).toBe(-2);
    });
  });
  
  describe('Tests for "Sulfuras"', () => {
    const sulfurasQuality = 80;

    it('quality should never decrease', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, sulfurasQuality)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(sulfurasQuality);
    });

    it('sellIn should never decrease', () => {
      const sellInValue = 10;
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', sellInValue, sulfurasQuality)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(sellInValue);
    });

    it('quality should always be 80', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, sulfurasQuality)]);
      for (let day = 0; day < 10; day++) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[0].quality).toBe(sulfurasQuality);
    });

    it('quality remains 80 regardless of the sellIn value', () => {
      const gildedRose = new GildedRose([
        new Item('Sulfuras, Hand of Ragnaros', -1, sulfurasQuality),
        new Item('Sulfuras, Hand of Ragnaros', 0, sulfurasQuality),
        new Item('Sulfuras, Hand of Ragnaros', 1, sulfurasQuality),
      ]);
      gildedRose.updateQuality();
      gildedRose.items.forEach(item => {
        expect(item.quality).toBe(sulfurasQuality);
      });
    });
  });
  
  describe('Tests for "Conjured"', () => {
    it('should degrade quality by 2 before the sell by date', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 10, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(8);
      expect(gildedRose.items[0].sellIn).toBe(9);
    });

    it('should degrade quality by 4 after the sell by date has passed', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(6);
      expect(gildedRose.items[0].sellIn).toBe(-1);
    });

    it('should not degrade quality below 0 before the sell by date', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 10, 1)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
      expect(gildedRose.items[0].sellIn).toBe(9);
    });

    it('should not degrade quality below 0 after the sell by date has passed', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', -1, 3)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
    });

    it('should continue to degrade quality by 2 before the sell by date even when quality is low', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 10, 3)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(1);
      expect(gildedRose.items[0].sellIn).toBe(9);
    });

    it('should degrade quality twice as fast after the sell by date even from a low quality', () => {
      const gildedRose = new GildedRose([new Item('Conjured Mana Cake', -1, 6)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(2);
    });
  });
});
