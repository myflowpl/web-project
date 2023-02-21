import { createMachine } from 'xstate';

const appMachine =
/** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgAoBbAQwGMALASwzAEp8QAHLWKgFyqw0YA9EAtAA4AzADoADACYALAE4ArAoDs8hQEZ1yqegCegzQrFqAbKvUjLEicqHI0IYuWq06Ymh0Ys2nbn0EiRtJqKmqa2nqCUnKSmkK2cmZSQhoKJvboTpQ09O4YHGKw7GBM6l6sHFw8SCD8COpSYnLKChIyMlKtMkJCyeqRCCrGyupy6iaj8SJtyvb2QA */
createMachine({
  states: {
    init: {
      states: {
        step1: {}
      },

      initial: "step1"
    }
  },

  initial: "init"
})
