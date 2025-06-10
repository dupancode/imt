new Vue({
  el: '#app',
  data() {
    return {
      gender: 'male',
      age: null,
      height: null,
      weight: null,
      activityLevel: "1.375",
      categories: [
        { label: 'Kurus', range: '< 18.5' },
        { label: 'Normal', range: '18.5 - 24.9' },
        { label: 'Kegemukan', range: '25.0 - 29.9' },
        { label: 'Obesitas Kelas I', range: '30.0 - 34.9' },
        { label: 'Obesitas Kelas II', range: '35.0 - 39.9' },
        { label: 'Obesitas Kelas III', range: '≥ 40.0' }
      ]
    };
  },
  computed: {
    bmi() {
      if (!this.height || !this.weight || this.height <= 0) return 0;
      return this.weight / ((this.height / 100) ** 2);
    },
    idealWeight() {
      if (!this.height || this.height <= 0) return 0;
      return 22 * (this.height / 100) ** 2;
    },
    bmiCategory() {
      if (!this.height || !this.weight) return '';
      if (this.bmi < 18.5) return 'Kurus';
      if (this.bmi < 25) return 'Normal';
      if (this.bmi < 30) return 'Kegemukan';
      if (this.bmi < 35) return 'Obesitas Kelas I';
      if (this.bmi < 40) return 'Obesitas Kelas II';
      return 'Obesitas Kelas III';
    },
    bmr() {
      if (!this.weight || !this.height || !this.age) return 0;
      return this.gender === 'male' ?
        88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.age) :
        447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.age);
    },
    dailyCalories() {
      return this.bmr * parseFloat(this.activityLevel);
    },
    proteinGrams() {
      return Math.round((this.dailyCalories * 0.3) / 4);
    },
    carbGrams() {
      return Math.round((this.dailyCalories * 0.5) / 4);
    },
    fatGrams() {
      return Math.round((this.dailyCalories * 0.2) / 9);
    },
    nutritionRecommendation() {
      const diff = this.weight - this.idealWeight;
      if (diff > 5) {
        return "Untuk menurunkan berat badan, fokus pada defisit kalori 300-500 kkal/hari. Tingkatkan asupan protein dan serat, kurangi gula dan lemak jenuh.";
      } else if (diff < -5) {
        return "Untuk menambah berat badan, tambah asupan kalori 300-500 kkal/hari. Pilih makanan padat nutrisi seperti kacang-kacangan dan protein tanpa lemak.";
      }
      return "Pertahankan pola makan seimbang dengan komposisi makronutrien di atas. Lakukan aktivitas fisik rutin untuk menjaga kesehatan.";
    }
  }
});
