<template>
  <div class="d-flex justify-center pa-6 pa-sm-5 pa-md-14">
    <v-card
      elevation="2"
      class="pa-6 ma-16"
      width="300"
    >
      <h1>
        Login
      </h1>
      <v-text-field
        type="email"
        label="email"
        required
        v-model="email"
      ></v-text-field>
      <v-text-field
        type="password"
        label="password"
        v-model="password"
        required
      ></v-text-field>
      <div class="d-flex justify-space-between">
        <v-btn
          color="secondary"
          @click="loginButtonClick"
        >
          로그인
        </v-btn>
        <v-btn
          color="secondary"
        >
          회원가입
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import linkApi from '../api/link';
import userApi from '../api/user';

@Component
export default class Login extends Vue {
  @Getter('isLogined')
  private isLogined!: boolean;

  @Mutation('login')
  private login!: (token: string) => void;

  private email = '';

  private password = '';

  mounted() {
    if (this.isLogined) {
      this.$router.push('/');
    }
  }

  async loginButtonClick() {
    const response = await userApi.login(this.email, this.password);
    if (response.status === 200) {
      const token = response.data.data.accessToken;
      this.login(token);
      this.$router.push('/');
    } else {
      alert('로그인에 실패했습니다.');
    }
  }
}
</script>
