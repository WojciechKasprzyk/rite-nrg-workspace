import { TestBed } from '@angular/core/testing';
import { HttpService } from "./_http.service";
import { MockProvider } from "ng-mocks";
import { HttpClient } from "@angular/common/http";
import spyOn = jest.spyOn;


describe('HttpService', () => {
  let service: HttpService<any>;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        MockProvider(HttpClient)
      ]
    });
    service = TestBed.inject(HttpService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get http method executing fetchAll', () => {
    const spy = spyOn(http, 'get');
    service.fetchAll();

    expect(spy).toHaveBeenCalled();
  })

  it('should call delete http method executing delete', () => {
    const spy = spyOn(http, 'delete');
    service.delete(NaN);

    expect(spy).toHaveBeenCalled();
  })

  it('should call post http method executing create', () => {
    const spy = spyOn(http, 'post');
    service.create({});

    expect(spy).toHaveBeenCalled();
  })

  it('should call patch http method executing update', () => {
    const spy = spyOn(http, 'patch');
    service.update({});

    expect(spy).toHaveBeenCalled();
  })
});
