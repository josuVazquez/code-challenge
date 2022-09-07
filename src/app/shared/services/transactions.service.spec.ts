import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TransactionsService } from './transactions.service';

export const transactions = [
  {
    "id": 4734,
    "date": "2018-07-11T22:49:24.000Z",
    "amount": -193.38,
    "fee": -3.18,
    "description": "Lorem ipsum dolor sit amet",
    "userId": 1
  },
  {
    "id": 2210,
    "date": "2018-07-14T16:54:27.000Z",
    "amount": 165.36,
    "description": "Est ullamco mollit ad in in proident.",
    "userId": 1
  },
  {
    "id": 1442,
    "date": "2018-07-24T18:10:10.000Z",
    "amount": -113.86,
    "description": "",
    "userId": 1
  },
  {
    "id": 8396,
    "date": "2018-06-11T11:31:27.000Z",
    "amount": -153.62,
    "fee": -3.14,
    "description": "Quis reprehenderit ullamco incididunt non ut.",
    "userId": 1
  },
  {
    "id": 3369,
    "date": "2018-07-19T21:33:19.000Z",
    "amount": -38.67,
    "userId": 1
  },
  {
    "id": 2911,
    "date": "2018-07-29T17:56:43.000Z",
    "amount": 87.84,
    "fee": -1.11,
    "description": "Veniam sit ut pariatur do.",
    "userId": 1
  },
  {
    "id": 2911,
    "date": "2018-07-21T19:13:23.000Z",
    "amount": 37.74,
    "fee": 0,
    "description": "Lorem et incididunt aute cillum.",
    "userId": 1
  },
  {
    "id": 6595,
    "date": "2018-07-22T13:48:48.000Z",
    "amount": 87.95,
    "description": "Minim non sunt cupidatat magna nisi ut duis.",
    "userId": 1
  },
  {
    "id": 3371,
    "date": "2018-07-24T21:29:11.000Z",
    "amount": -161.56,
    "fee": -4.95,
    "description": null,
    "userId": 1
  },
  {
    "id": 6068,
    "date": "2018-07-26T15:20:52.000Z",
    "amount": 92.54,
    "description": "Nostrud laboris id officia aliquip.",
    "userId": 1
  },
  {
    "id": 5038,
    "date": "2014-07-30T19:36:00.000Z",
    "amount": 184.98,
    "userId": 1
  },
  {
    "id": 6595,
    "date": "2018-07-24T20:20:56.000Z",
    "amount": -37.22,
    "fee": -3.99,
    "description": "Veniam deserunt ut ullamco et ut.",
    "userId": 1
  },
  {
    "id": 2117,
    "date": "2018-07-28T14:14:17.000Z",
    "amount": 96.56,
    "description": "",
    "userId": 1
  },
  {
    "id": 2857,
    "date": "2019-07-22T13:51:12.000Z",
    "amount": -144.63,
    "fee": -4.74,
    "description": "Tempor dolor laboris minim cupidatat duis nisi ad.",
    "userId": 1
  },
  {
    "id": 9745,
    "date": "2018-07-26T19:26:10.000Z",
    "amount": 166.83,
    "description": "Fugiat elit cupidatat ipsum ad Lorem aliquip.",
    "userId": 1
  }
];

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransactionsService,
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TransactionsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all transactions desc', () => {
    service.getTransactions().subscribe( transactions => {
      expect(transactions).toBeTruthy();
      expect(transactions.length).toBe(15);
      expect(transactions[0]?.id).toBe(2857);
    });
    const req = httpTestingController.expectOne('http://localhost:8080/transactions?sort=desc');
    expect(req.request.method).toEqual('GET');
    req.flush(transactions.sort((a,b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }))
  });

  it('should get all transactions asc', () => {
    service.getTransactions('asc').subscribe( transactions => {
      expect(transactions).toBeTruthy();
      expect(transactions.length).toBe(15);
      expect(transactions[0]?.id).toBe(5038);
    });
    const req = httpTestingController.expectOne('http://localhost:8080/transactions?sort=asc');
    expect(req.request.method).toEqual('GET');
    req.flush(transactions.sort((a,b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }))
  });

  it('should get transactions filtered', () => {
    service.getTransactions('desc', 'tempor').subscribe( transactions => {
      expect(transactions).toBeTruthy();
      expect(transactions.length).toBe(1);
      expect(transactions[0]?.id).toBe(2857);
    });
    const req = httpTestingController.expectOne('http://localhost:8080/transactions?sort=desc&description=tempor');
    expect(req.request.method).toEqual('GET');
    req.flush(transactions.filter((t) => {
      return t.description?.toLocaleLowerCase().includes('tempor');
    }))
  });
});
