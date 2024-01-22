import axios from "axios";
import { promises as fsPromises } from "fs";
import { GildedRose, Item } from "./gilded-rose";

const shop = new GildedRose([
  new Item("Aged Brie", 5, 10),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
  new Item("Conjured Mana Cake", 5, 10),
  new Item("Sulfuras, Hand of Ragnaros", 5, 80),
  new Item("Regular Item", 5, 10),
]);

let updatesCounter = 0;

const logToFile = async (message: string): Promise<void> => {
  const timestamp = new Date().toISOString();
  await fsPromises.appendFile("log.txt", `${timestamp}: ${message}\n`);
};

const makeRequest = async (): Promise<number> => {
  try {
    const response = await axios.get("https://yesno.wtf/api");
    return response.data.answer === "yes" ? 1 : 0;
  } catch (error) {
    console.error("Error making HTTP request:", error);
    return 0;
  }
};

const processUpdates = async (
  updates: number,
  initialRequests: number
): Promise<void> => {
  for (let i = 0; i < updates; i++) {
    let requests = initialRequests;
    let totalPositiveCount = 0;
    let positiveCount = 0;
		
    do {
      const promises = Array(requests)
        .fill(null)
        .map(() => makeRequest());
      positiveCount = (await Promise.all(promises)).reduce(
        (sum, value) => sum + value,
        0
      );
      totalPositiveCount += positiveCount;
      requests = positiveCount;
    } while (positiveCount > 0);
		
    await logToFile(`Number of positive responses: ${totalPositiveCount}`);
    
    // Update the shop only after all responses are negative
    updatesCounter++;
    console.log(`Update #${updatesCounter}:`);
    shop.updateQuality();
    shop.items.forEach(item => {
      console.log(` - ${item.name}, SellIn: ${item.sellIn}, Quality: ${item.quality}`);
    });
  }
};

const [updatesCount, startRequestsCount] = process.argv.slice(2).map(Number);
processUpdates(updatesCount, startRequestsCount).catch(console.error);