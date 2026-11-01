/**
 * BMI Calculator Utility
 * Formula: BMI = weight (kg) / [height (m)]²
 * 
 * Provides validated calculation and educational categorization.
 * BMI alone cannot determine or diagnose diabetes risk.
 */

export const calculateBMI = (heightCm, weightKg) => {
  const height = parseFloat(heightCm);
  const weight = parseFloat(weightKg);

  if (!height || isNaN(height) || height < 50 || height > 260) {
    return {
      isValid: false,
      error: 'Please enter a valid height between 50 and 260 cm.',
    };
  }

  if (!weight || isNaN(weight) || weight < 20 || weight > 350) {
    return {
      isValid: false,
      error: 'Please enter a valid weight between 20 and 350 kg.',
    };
  }

  const heightInMeters = height / 100;
  const bmiValue = weight / (heightInMeters * heightInMeters);
  const roundedBmi = parseFloat(bmiValue.toFixed(1));

  let category = '';
  let color = '#10B981';
  let badgeClass = 'badge-success';
  let description = '';

  if (roundedBmi < 18.5) {
    category = 'Underweight';
    color = '#F59E0B';
    badgeClass = 'badge-warning';
    description = 'Body mass index is below the standard recommended range.';
  } else if (roundedBmi >= 18.5 && roundedBmi < 25.0) {
    category = 'Normal Weight';
    color = '#16A34A';
    badgeClass = 'badge-success';
    description = 'Body mass index is within the standard healthy reference range.';
  } else if (roundedBmi >= 25.0 && roundedBmi < 30.0) {
    category = 'Overweight';
    color = '#F59E0B';
    badgeClass = 'badge-warning';
    description = 'Carrying excess body weight can be an indicator for elevated metabolic risk factors.';
  } else if (roundedBmi >= 30.0 && roundedBmi < 35.0) {
    category = 'Obesity Class I';
    color = '#EA580C';
    badgeClass = 'badge-warning';
    description = 'Significantly elevated body mass associated with higher metabolic strain.';
  } else if (roundedBmi >= 35.0 && roundedBmi < 40.0) {
    category = 'Obesity Class II';
    color = '#DC2626';
    badgeClass = 'badge-danger';
    description = 'Substantially elevated body mass index requiring clinical evaluation.';
  } else {
    category = 'Obesity Class III';
    color = '#991B1B';
    badgeClass = 'badge-danger';
    description = 'Severe elevation in body mass index. Healthcare consultation strongly recommended.';
  }

  // Calculate healthy weight range for this height
  const minHealthyWeight = (18.5 * (heightInMeters * heightInMeters)).toFixed(1);
  const maxHealthyWeight = (24.9 * (heightInMeters * heightInMeters)).toFixed(1);

  return {
    isValid: true,
    bmi: roundedBmi,
    category,
    color,
    badgeClass,
    description,
    healthyWeightRange: `${minHealthyWeight} - ${maxHealthyWeight} kg`,
    explanation: 'BMI is a calculation based on your height and weight. It is only one measure of health and cannot tell you whether you have diabetes.',
    disclaimer: 'BMI is a calculation based on your height and weight. It is only one measure of health and cannot tell you whether you have diabetes.'
  };
};
