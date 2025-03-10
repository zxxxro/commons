import { describe, it } from '@std/bdd';
import { expect } from '@std/expect';

import Consumer from '~/container/annotations/Consumer.ts';
import Factory from '~/common/services/Factory.ts';
import Provider from '~/container/annotations/Provider.ts';
import ProviderException from '~/container/exceptions/ProviderException.ts';

describe('container', () => {

  interface UserProviderMockInterface {
    getUserFirstName(): string
  }
  
  @Provider()
  class UserProviderMock implements UserProviderMockInterface {
    public getUserFirstName(): string {
      return 'Eduardo'
    }
  }
  
  @Consumer()
  class ConsumerAccountMock {
    
    @Consumer('UserProviderMock')
    accessor firstAccessorUserProviderMock!: any;
  
    @Consumer(UserProviderMock)
    accessor secondAccessorUserProviderMock!: any;
    
    constructor(public userProviderMock: UserProviderMockInterface) {}
  
    public getUserFirstName() {
      return this.userProviderMock.getUserFirstName()
    }
  
    public getFirstAccessorUserFirstName() {
      return (<UserProviderMock>this.firstAccessorUserProviderMock).getUserFirstName()
    }
  
    public getSecondAccessorUserFirstName() {
      return this.secondAccessorUserProviderMock.getUserFirstName()
    }
  }
  
  @Consumer({ NotFoundProvider: { optional: false }})
  class ConsumerNotFoundProviderMock {    
    constructor (public notFoundProvider: any) {}
  }
  
  it('throws if provider do not exist and is not optional', () => {
    expect(() => Factory.construct(ConsumerNotFoundProviderMock)).toThrow(ProviderException)
  });

  const consumerAccountMock = Factory.construct(ConsumerAccountMock)

  it('inject from constructor property', () => {
    expect(consumerAccountMock.getUserFirstName()).toEqual('Eduardo')
  });

  it('inject from field properties', () => {
    expect(consumerAccountMock.getFirstAccessorUserFirstName()).toEqual('Eduardo')
    expect(consumerAccountMock.getSecondAccessorUserFirstName()).toEqual('Eduardo')
  });
});
