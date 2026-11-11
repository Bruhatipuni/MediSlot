import { useState, useCallback } from 'react';

export const useFormValidation = (initialValues, schema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    setErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }, []);

  const validate = useCallback(() => {
    if (!schema) return { isValid: true, data: values };

    const result = schema.safeParse(values);
    if (result.success) {
      setErrors({});
      return { isValid: true, data: result.data };
    }

    const formattedErrors = {};
    result.error.issues.forEach((issue) => {
      const fieldPath = issue.path[0];
      if (fieldPath && !formattedErrors[fieldPath]) {
        formattedErrors[fieldPath] = issue.message;
      }
    });

    setErrors(formattedErrors);
    return { isValid: false, errors: formattedErrors };
  }, [schema, values]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    setFieldValue,
    setValues,
    validate,
    resetForm,
  };
};

export default useFormValidation;
