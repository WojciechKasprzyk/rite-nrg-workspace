import { Injectable } from "@angular/core";
import { TestBed } from '@angular/core/testing';
import { MockProvider } from "ng-mocks";
import { HttpClient } from "@angular/common/http";
import { DepartmentsService } from "./departments.service";
import spyOn = jest.spyOn;

@Injectable()
class TestingDepartmentsService extends DepartmentsService {
  getUrl(): string {
    return this.url;
  }
}

describe('HttpService', () => {
  let service: TestingDepartmentsService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TestingDepartmentsService,
        MockProvider(HttpClient)
      ]
    });
    service = TestBed.inject(TestingDepartmentsService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get http method executing fetchAll', () => {
    const spy = spyOn(http, 'get');
    service.fetchAll();

    expect(spy).toHaveBeenCalledWith(service.getUrl());
  })

  it('should call delete http method executing delete', () => {
    const spy = spyOn(http, 'delete');
    const id = 1;
    const url = `${service.getUrl()}/${id}`
    service.delete(id);

    expect(spy).toHaveBeenCalledWith(url);
  })

  it('should call post http method executing create', () => {
    const spy = spyOn(http, 'post');
    const id = 1;
    const url = service.getUrl();
    const body = {
      id: 2,
      name: 'R&D'
    }
    service.create(body);

    expect(spy).toHaveBeenCalledWith(url, body);
  })

  it('should call patch http method executing update', () => {
    const spy = spyOn(http, 'patch');
    const body = {
      id: 2,
      name: 'R&D'
    }
    const url = `${service.getUrl()}/${body.id}`
    service.update(body);

    expect(spy).toHaveBeenCalledWith(url, body);
  })
});
