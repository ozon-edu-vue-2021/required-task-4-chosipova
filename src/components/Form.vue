<template>
  <div class="container">
    <form autocomplete="off" class="form" @submit.prevent="formSubmit">
      <h2 class="mb-4">Личные данные</h2>
      <div class="row mb-4">
        <div class="col-md-4">
          <Input
            v-model="formData.personalData.lastname"
            :rule="validationRules.onlyRussian.rule"
            :error="validationRules.onlyRussian.errorMessage"
            :valid.sync="validationRules.valid"
            type="text"
            label="Фамилия"
          />
        </div>
        <div class="col-md-4">
          <Input
            v-model="formData.personalData.firstname"
            :rule="validationRules.onlyRussian.rule"
            :error="validationRules.onlyRussian.errorMessage"
            :valid.sync="validationRules.valid"
            type="text"
            label="Имя"
          />
        </div>
        <div class="col-md-4">
          <Input
            v-model="formData.personalData.middlename"
            :rule="validationRules.onlyRussian.rule"
            :error="validationRules.onlyRussian.errorMessage"
            :valid.sync="validationRules.valid"
            type="text"
            label="Отчество"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <Input
            v-model="formData.personalData.birthday"
            :error="validationRules.date.errorMessage"
            :valid.sync="validationRules.valid"
            type="date"
            label="Дата рождения"
          />
        </div>
        <div class="col-md-4">
          <Input
            v-model="formData.personalData.email"
            :rule="validationRules.email.rule"
            :error="validationRules.email.errorMessage"
            :valid.sync="validationRules.valid"
            type="text"
            label="Email"
          />
        </div>
        <div class="col-md-4">
          <p>Пол</p>
          <RadioButton
            v-model="formData.personalData.gender"
            name="gender"
            value="male"
            label="Мужской"
          />
          <RadioButton
            v-model="formData.personalData.gender"
            name="gender"
            value="female"
            label="Женский"
          />
        </div>
      </div>
      <h2 class="mb-4 mt-4">Паспортные данные</h2>
      <div class="row mb-4">
        <div class="col-md-4">
          <Autocomplete
            v-model="formData.passportData.citizenship"
            label="Гражданство"
            textValue="nationality"
            :items="citizenshipsAll"
            :valid.sync="validationRules.valid"
          />
        </div>
      </div>
      <div
        v-if="
          formData.passportData.citizenship &&
          formData.passportData.citizenship.id == 8604
        "
      >
        <div class="row">
          <div class="col-md-4">
            <Input
              v-model="formData.passportData.series"
              :rule="validationRules.passportSeries.rule"
              :error="validationRules.passportSeries.errorMessage"
              :valid.sync="validationRules.valid"
              type="number"
              label="Серия паспорта"
            />
          </div>
          <div class="col-md-4">
            <Input
              v-model="formData.passportData.number"
              :rule="validationRules.passportNumber.rule"
              :error="validationRules.passportNumber.errorMessage"
              :valid.sync="validationRules.valid"
              type="number"
              label="Номер паспорта"
            />
          </div>
          <div class="col-md-4">
            <Input
              v-model="formData.passportData.date"
              :error="validationRules.date.errorMessage"
              :valid.sync="validationRules.valid"
              type="date"
              label="Дата выдачи"
            />
          </div>
        </div>
      </div>
      <div
        v-else-if="
          formData.passportData.citizenship &&
          formData.passportData.citizenship.id !== 8604
        "
      >
        <div class="row mb-4">
          <div class="col-md-4">
            <Input
              v-model="formData.passportData.foreignСitizen.lastname"
              :rule="validationRules.onlyEnglish.rule"
              :error="validationRules.onlyEnglish.errorMessage"
              :valid.sync="validationRules.valid"
              type="text"
              label="Фамилия на латинице"
            />
          </div>
          <div class="col-md-4">
            <Input
              v-model="formData.passportData.foreignСitizen.firstname"
              :rule="validationRules.onlyEnglish.rule"
              :error="validationRules.onlyEnglish.errorMessage"
              :valid.sync="validationRules.valid"
              type="text"
              label="Имя на латинице"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <Input
              v-model="formData.passportData.foreignСitizen.passportnumber"
              :valid.sync="validationRules.valid"
              type="number"
              label="Номер паспорта"
            />
          </div>
          <div class="col-md-4">
            <Autocomplete
              v-model="formData.passportData.foreignСitizen.countryissue"
              label="Страна выдачи"
              textValue="nationality"
              :items="countryIssue"
              :valid.sync="validationRules.valid"
            />
          </div>
          <div class="col-md-4">
            <Autocomplete
              v-model="formData.passportData.foreignСitizen.passporttype"
              label="Тип паспорта"
              textValue="type"
              :items="passportTypes"
              :valid.sync="validationRules.valid"
            />
          </div>
        </div>
      </div>
      <div class="row changed-name-block">
        <div class="col-md-4">
          <p>Меняли ли фамилию или имя?</p>
          <RadioButton
            v-model="formData.passportData.changedname"
            name="changedname"
            :value="false"
            label="Нет"
          />
          <RadioButton
            v-model="formData.passportData.changedname"
            name="changedname"
            :value="true"
            label="Да"
          />
        </div>
        <div class="col-md-4" v-if="formData.passportData.changedname">
          <Input
            v-model="formData.passportData.previousname.lastname"
            :rule="validationRules.onlyRussian.rule"
            :error="validationRules.onlyRussian.errorMessage"
            :valid.sync="validationRules.valid"
            type="text"
            label="Предыдущая Фамилия"
          />
        </div>
        <div class="col-md-4" v-if="formData.passportData.changedname">
          <Input
            v-model="formData.passportData.previousname.firstname"
            :rule="validationRules.onlyRussian.rule"
            :error="validationRules.onlyRussian.errorMessage"
            :valid.sync="validationRules.valid"
            type="text"
            label="Предыдущее Имя"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-lg btn-block">
        Отправить
      </button>
    </form>
  </div>
</template>

<script>
import citizenships from "@/assets/data/citizenships.json";
import passporttypes from "@/assets/data/passport-types.json";
import Input from "../components/Input/Input.vue";
import RadioButton from "../components/RadioButton/RadioButton.vue";
//import Select from "../components/Select/Select.vue";
import Autocomplete from "../components/Autocomplete/Autocomplete.vue";

export default {
  data() {
    return {
      formData: {
        personalData: {
          lastname: "",
          firstname: "",
          middlename: "",
          birthday: "",
          email: "",
          gender: "male",
        },
        passportData: {
          citizenship: null,
          series: "",
          number: "",
          date: "",
          foreignСitizen: {
            firstname: "",
            lastname: "",
            passportnumber: "",
            countryissue: null,
            passporttype: null,
          },
          changedname: false,
          previousname: {
            firstname: "",
            lastname: "",
          },
        },
      },
      validationRules: {
        valid: true,
        onlyRussian: {
          rule: /^[а-яА-ЯёЁ]+$/g,
          errorMessage: "Только русские буквы",
        },
        onlyEnglish: {
          rule: /^[a-zA-Z]+$/g,
          errorMessage: "Только английские буквы",
        },
        email: {
          rule: /^[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
          errorMessage: "Некорректный Email",
        },
        date: {
          rule: "",
          errorMessage: "Некорректная дата",
        },
        passportSeries: {
          rule: /^\d{4}$/,
          errorMessage: "Только 4 цифры",
        },
        passportNumber: {
          rule: /^\d{6}$/,
          errorMessage: "Только 6 цифр",
        },
      },
      citizenshipsAll: citizenships,
      passportTypes: passporttypes,
      countryIssue: citizenships,
    };
  },
  components: {
    Input,
    RadioButton,
    //   Select,
    Autocomplete,
  },
  methods: {
    async updateProfileInfo() {
      try {
        console.log("UPDATE API EVENT DONE", this.formData);
        // throw "123"; - можно проверить catch
        this.$notify({
          group: "foo",
          type: "success",
          title: "OK",
          text: "Всё хорошо",
        });
      } catch (error) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "UPDATE FAILD",
          text: "Подробно: " + error,
        });
      }
    },
    async formSubmit() {
      this.validationRules.valid = true;
      this.$children.forEach((el) => {
        if (
          el.$options._componentTag == "Input" ||
          el.$options._componentTag == "Autocomplete"
        ) {
          el.checkInput();
        }
      });
      if (this.validationRules.valid) {
        console.log("UPDATE API EVENT", this.formData);
        await this.updateProfileInfo();
      } else {
        console.log("FAILED UPDATE API EVENT");
        this.$notify({
          group: "foo",
          type: "warn",
          title: "DATA IS NOT VALID",
          text: "Проверьте данные",
        });
      }
    },
  },
};
</script>

<style scoped>
.radio-inline {
  margin-right: 10px;
}
.changed-name-block {
  margin-top: 25px;
}
p {
  margin-bottom: 0.5rem;
}
.btn {
  margin-top: 25px;
  cursor: pointer;
}
</style>
