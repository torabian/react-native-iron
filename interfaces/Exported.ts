/* Do not change, this code is generated from Golang structs */

import moment from 'moment';

export class BookAwardEntity {
  name: string;
  year: number;
  country: string;

  constructor(source: any = {}) {
    if ('string' === typeof source) source = JSON.parse(source);
    this.name = source['name'];
    this.year = source['year'];
    this.country = source['country'];
  }
}
export class BookPublicationEntity {
  name: string;
  establishedYear: number;
  price: number;

  constructor(source: any = {}) {
    if ('string' === typeof source) source = JSON.parse(source);
    this.name = source['name'];
    this.establishedYear = source['establishedYear'];
    this.price = source['price'];
  }
}
export class ResellerEntity {
  uniqueId: string;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
  deletedAt: DeletedAt;
  name: string;
  city: string;
  address: string;

  constructor(source: any = {}) {
    if ('string' === typeof source) source = JSON.parse(source);
    this.uniqueId = source['uniqueId'];
    this.createdAt = moment(source['createdAt']);
    this.updatedAt = moment(source['updatedAt']);
    this.deletedAt = this.convertValues(source['deletedAt'], DeletedAt);
    this.name = source['name'];
    this.city = source['city'];
    this.address = source['address'];
  }

  convertValues(a: any, classs: any, asMap: boolean = false): any {
    if (!a) {
      return a;
    }
    if (a.slice) {
      return (a as any[]).map(elem => this.convertValues(elem, classs));
    } else if ('object' === typeof a) {
      if (asMap) {
        for (const key of Object.keys(a)) {
          a[key] = new classs(a[key]);
        }
        return a;
      }
      return new classs(a);
    }
    return a;
  }
}
export class DeletedAt {
  Time: moment.Moment;
  Valid: boolean;

  constructor(source: any = {}) {
    if ('string' === typeof source) source = JSON.parse(source);
    this.Time = moment(source['Time']);
    this.Valid = source['Valid'];
  }
}
export class BookEntity {
  uniqueId: string;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
  deletedAt: DeletedAt;
  resellersListId: string[];
  resellers: ResellerEntity[];
  mainResellerId: string;
  mainReseller: ResellerEntity;
  publication: BookPublicationEntity;
  awards: BookAwardEntity[];
  name: string;
  author: string;
  country: string;
  imageLink: string;
  firstReleaseDate: string;
  language: string;
  link: string;
  coverColor: string;
  pages: number;
  title: string;
  underAgeAccess: boolean;
  year: number;

  constructor(source: any = {}) {
    if ('string' === typeof source) source = JSON.parse(source);
    this.uniqueId = source['uniqueId'];
    this.createdAt = moment(source['createdAt']);
    this.updatedAt = moment(source['updatedAt']);
    this.deletedAt = this.convertValues(source['deletedAt'], DeletedAt);
    this.resellersListId = source['resellersListId'];
    this.resellers = this.convertValues(source['resellers'], ResellerEntity);
    this.mainResellerId = source['mainResellerId'];
    this.mainReseller = this.convertValues(
      source['mainReseller'],
      ResellerEntity,
    );
    this.publication = this.convertValues(
      source['publication'],
      BookPublicationEntity,
    );
    this.awards = this.convertValues(source['awards'], BookAwardEntity);
    this.name = source['name'];
    this.author = source['author'];
    this.country = source['country'];
    this.imageLink = source['imageLink'];
    this.firstReleaseDate = source['firstReleaseDate'];
    this.language = source['language'];
    this.link = source['link'];
    this.coverColor = source['coverColor'];
    this.pages = source['pages'];
    this.title = source['title'];
    this.underAgeAccess = source['underAgeAccess'];
    this.year = source['year'];
  }

  convertValues(a: any, classs: any, asMap: boolean = false): any {
    if (!a) {
      return a;
    }
    if (a.slice) {
      return (a as any[]).map(elem => this.convertValues(elem, classs));
    } else if ('object' === typeof a) {
      if (asMap) {
        for (const key of Object.keys(a)) {
          a[key] = new classs(a[key]);
        }
        return a;
      }
      return new classs(a);
    }
    return a;
  }
}
