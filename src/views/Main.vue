<template>
  <div class="pa-6 pa-sm-5 pa-md-14">
    <h1 class="v-heading text-h3 text-sm-h3 mb-4">
      단축 URL
    </h1>
    <v-card
      class="mx-auto"
      tile
    >
      <v-dialog
        v-model="deleteDialog"
        persistent
        max-width="400"
      >
        <template v-slot:activator="{}">
          <div>
            <v-list-item
              v-for="(link, index) in links"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title>https://go.jhbang.link/{{ link.shortLink }}</v-list-item-title>
                <v-list-item-subtitle>{{ link.originalLink }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  color="primary"
                  icon
                  @click="deleteButtonClick(link.shortLink)"
                >
                  <v-icon color="secondary">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </div>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            정말로 {{ selectedItem }}를 삭제하시겠습니까?
          </v-card-title>
          <v-card-text>삭제 후 되돌릴 수 없습니다.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="secondary"
              text
              @click="closeDialog"
            >
              아니오
            </v-btn>
            <v-btn
              color="secondary"
              text
              @click="removeItem(selectedItem)"
            >
              예
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
    <v-dialog
      v-if="isLogined"
      v-model="addDialog"
      persistent
      max-width="600"
    >
      <template v-slot:activator="{}">
        <v-btn
          color="secondary"
          fixed
          bottom
          right
          fab
          @click="addDialog = true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">URL 추가</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="단축할 링크"
                  required
                  v-model="originalLink"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="https://go.jhbang.link/"
                  required
                  v-model="shortLink"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            text
            @click="closeDialog"
          >
            취소
          </v-btn>
          <v-btn
            color="secondary"
            text
            @click="addItem"
          >
            추가
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import Link from '../interfaces/link';
import linkApi from '../api/link';

@Component
export default class Main extends Vue {
  private loading = false;

  private deleteDialog = false;

  private addDialog = false;

  private selectedItem = '';

  private links: Link[] = [{
    originalLink: '',
    shortLink: '',
  }];

  @Getter('isLogined')
  private isLogined!: boolean;

  private originalLink = '';

  private shortLink = '';

  deleteButtonClick(shortLink: string): void {
    this.selectedItem = shortLink;
    this.deleteDialog = true;
  }

  async loadLinks() {
    const temp = await linkApi.getAllLink();
    this.links = temp.data.data.links;
  }

  mounted() {
    if (!this.isLogined) {
      this.$router.push('/login');
    }

    this.loadLinks();
  }

  closeDialog() {
    this.deleteDialog = false;
    this.addDialog = false;
  }

  async removeItem(item: string) {
    await linkApi.deleteItem(item);
    this.closeDialog();
    this.loadLinks();
  }

  async addItem() {
    await linkApi.addItem(this.originalLink, this.shortLink);
    this.closeDialog();
    this.loadLinks();
  }
}
</script>
