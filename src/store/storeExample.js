import {
    Module,
    VuexModule,
    Mutation,
    Action
} from 'vuex-module-decorators'

@Module({'name': 'counter2'})
export default class Counter2 extends VuexModule {
    count = 0

    @Mutation
    increment(delta) {
        this.doSomeOtherMagic()
        this.count += delta
    }
    @Mutation
    decrement(delta) {
        this.count -= delta
    }
    get countValue() {
        return this.count
    }

    doSomeOtherMagic() {
        console.log("I'm doing magic..")
    }

    // action 'incr' commits mutation 'increment' when done with return value as payload
    @Action({
        commit: 'increment'
    })
    incr() {
        return 5
    }
    // action 'decr' commits mutation 'decrement' when done with return value as payload
    @Action({
        commit: 'decrement'
    })
    decr() {
        return 5
    }
}