import { Component } from '@angular/core';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss'],
})
export class Example1Component {
  items: Item[];
  sources = ['SOURCE1', 'SOURCE2', 'SOURCE3', 'SOURCE4', 'SOURCE5'];

  table: Table = {};

  constructor() {
    const startDate = new Date('2023-01-01');
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    this.items = this.generateMockData(startDate, endDate, this.sources);

    this.table = this.buildTable(startDate, endDate);
  }

  generateMockData(startDate: Date, endDate: Date, sources: string[]): Item[] {
    const items: Item[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const source = sources[Math.floor(Math.random() * sources.length)];
      items.push({
        title: `Item ${items.length + 1}`,
        source,
        date: new Date(currentDate),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return items;
  }

  buildTable(startDate: Date, endDate: Date): Table {
    const table: Table = {};
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      table[currentDate.getTime()] = {};
      this.sources.forEach((source) => {
        table[currentDate.getTime()][source] = this.items.filter(
          (item) =>
            item.source === source &&
            item.date.getTime() === currentDate.getTime()
        );
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return table;
  }

  dropItem(event: any) {
    console.log(
      event,
      event.item.data,
      event.container.data,
      event.previousContainer.data
    );

    const item: Item = event.item.data;
    const source: { row: number; column: string } =
      event.previousContainer.data;
    const sourceIndex: number = event.previousIndex;
    const destination: { row: number; column: string } = event.container.data;
    const destinationIndex: number = event.currentIndex;

    // Remove item from source
    this.table[source.row][source.column].splice(sourceIndex, 1);

    // Add item to destination
    this.table[destination.row][destination.column].splice(
      destinationIndex,
      0,
      item
    );
  }
}

interface Item {
  title: string;
  source: string;
  date: Date;
}

type Cell = Item[];

type Row = {
  [source: string]: Cell;
};

type Table = {
  [date: number]: Row;
};
