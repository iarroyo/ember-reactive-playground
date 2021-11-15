import { getOwner, setOwner } from '@ember/application';
import { capabilities } from '@ember/component';

export default class CustomComponentManager {
  capabilities = capabilities('3.13', {
    destructor: true,
    updateHook: true,
  });

  static create(owner) {
    let manager = new CustomComponentManager();
    setOwner(manager, owner);

    return manager;
  }

  createComponent(factory, args) {
    console.log('create component');
    return new factory(getOwner(this), args.named);
  }

  updateComponent(component, args) {
    console.log('update component');
    console.log(component);
    console.log(args);
  }

  destroyComponent(compoenent) {
    console.log(compoenent);
  }

  getContext(component) {
    return component;
  }
}
