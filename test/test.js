const assert = require('chai').assert;

const mastermind = (guesses, checker = [9, 5, 5, 0]) => {
    let blue = 0;
    let red = 0;

    for (let i = 0; i < 4; ++i) {
        if (guesses[i] === checker[i]) {
            checker[i] = null;
            guesses[i] = null;
            red++;
        }
    }

    for (let i = 0; i < 4; ++i) {
        if (guesses[i] !== null && checker.indexOf(guesses[i]) !== -1) {
            checker[checker.indexOf(guesses[i])] = null;
            guesses[i] = null;
            blue++;
        }
    }

    return [red, blue];
}

describe('All Cases', function () {
    it('Case 1', function () {
        assert.deepEqual(mastermind([1, 1, 1, 1]), [0, 0]);
    });

    it('Case 2', function () {
        assert.deepEqual(mastermind([1, 1, 1, 5]), [0, 1]);
    });

    it('Case 3', function () {
        assert.deepEqual(mastermind([5, 1, 1, 5]), [0, 2]);
    });

    it('Case 4', function () {
        assert.deepEqual(mastermind([5, 0, 0, 5]), [0, 3]);
    });

    it('Case 5', function () {
        assert.deepEqual(mastermind([5, 0, 9, 5]), [0, 4]);
    });

    it('Case 6', function () {
        assert.deepEqual(mastermind([1, 1, 5, 1]), [1, 0]);
    });

    it('Case 7', function () {
        assert.deepEqual(mastermind([1, 1, 5, 5]), [1, 1]);
    });

    it('Case 8', function () {
        assert.deepEqual(mastermind([1, 5, 0, 5]), [1, 2]);
    });

    it('Case 9', function () {
        assert.deepEqual(mastermind([0, 9, 5, 5]), [1, 3]);
    });

    it('Case 10', function () {
        assert.deepEqual(mastermind([5, 5, 5, 5]), [2, 0]);
    });

    it('Case 11', function () {
        assert.deepEqual(mastermind([9, 0, 5, 1]), [2, 1]);
    });

    it('Case 12', function () {
        assert.deepEqual(mastermind([5, 5, 9, 0]), [2, 2]);
    });

    it('Case 13', function () {
        assert.deepEqual(mastermind([9, 5, 1, 0]), [3, 0]);
    });

    it('Case 14', function () {
        assert.deepEqual(mastermind([9, 5, 5, 0]), [4, 0]);
    });
});
