export function entriesUnique(values, context) {
  // if there are duplicate entries
  if (values) {
    const refs = values.map((v) => v._ref);
    if (new Set(refs).size !== values.length) {
      return "Please remove duplicate entries";
    }
  }
  return true;
}

export function entriesProvided(values, context) {
  // if parent type is selected, but has no value
  if (
    (context.parent.type && !values) ||
    (Array.isArray(values) && values.length == 0)
  ) {
    return "Aspect(s) must have a value";
  } else {
    return true;
  }
}

export function buildEntriesValidationRule(validators) {
  return function validateEntries(Rule) {
    return Rule.custom((values, context) => {
      let errorMsg;
      for (const v of validators) {
        const error = v({ values, context });
        if (error) {
          errorMsg = error;
          break;
        }
      }
      return errorMsg ? errorMsg : true;
    });
  };
}
