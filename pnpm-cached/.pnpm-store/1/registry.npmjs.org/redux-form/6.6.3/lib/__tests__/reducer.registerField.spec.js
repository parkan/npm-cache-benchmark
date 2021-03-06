'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('../actions');

var describeRegisterField = function describeRegisterField(reducer, expect, _ref) {
  var fromJS = _ref.fromJS;
  return function () {
    it('should create registeredFields if it does not exist and a field', function () {
      var state = reducer(fromJS({
        foo: {}
      }), (0, _actions.registerField)('foo', 'bar', 'Field'));
      expect(state).toEqualMap({
        foo: {
          registeredFields: { bar: { name: 'bar', type: 'Field', count: 1 } }
        }
      });
    });

    it('should add a field to registeredFields', function () {
      var state = reducer(fromJS({
        foo: {
          registeredFields: { baz: { name: 'baz', type: 'FieldArray', count: 1 } }
        }
      }), (0, _actions.registerField)('foo', 'bar', 'Field'));
      expect(state).toEqualMap({
        foo: {
          registeredFields: {
            baz: { name: 'baz', type: 'FieldArray', count: 1 },
            bar: { name: 'bar', type: 'Field', count: 1 }
          }
        }
      });
    });

    it('should increase count if the field already exists', function () {
      var initialState = fromJS({
        foo: {
          registeredFields: { bar: { name: 'bar', type: 'Field', count: 1 } }
        }
      });
      var state = reducer(initialState, (0, _actions.registerField)('foo', 'bar', 'Field'));
      expect(state).toEqualMap({
        foo: {
          registeredFields: {
            bar: { name: 'bar', type: 'Field', count: 2 }
          }
        }
      });
    });
  };
};

exports.default = describeRegisterField;