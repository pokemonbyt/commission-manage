
<template>
  <div>
    <Dialog
      :header="isAdd ? 'Thêm mới' : 'Sửa'"
      v-model:visible="displayModal"
      :style="{ width: '50vw' }"
      :modal="true"
      class="p-fluid"
    >
      <div
        class="field p-input-icon-right"
        v-for="item in formItems"
        :key="item.name"
      >
        <label for="key">{{ item.label }}</label>
        <span class="relative">
          <InputSwitch
            v-if="item.name === 'status'"
            :id="'key' + item.name"
            v-model="formValues[item.name]"
            required="true"
            autofocus
            class = "button"
            :class="{
              'p-invalid': submitted && !formValues[item.name],
            }"
          />

          <InputText
            v-else
            :id="'key' + item.name"
            v-model.trim="formValues[item.name]"
            required="true"
            autofocus
            :class="{
              'p-invalid': submitted && !formValues[item.name], 
            }"
          />
        </span>
        <small
          v-if="
            (v$[item.name].$invalid && submitted) ||
            v$[item.name].$pending.$response
          "
          class="p-error"
          >{{
            v$[item.name].required.$message.replace('Value', item.label)
          }}</small
        >
      </div>
      
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          @click="closeModal"
          class="p-button-text"
        />
        <Button label="Yes" icon="pi pi-check" @click="submitModal" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue';
import {
  createRoles,
  updateRoles,
  // deleteRoles
} from '@/api/permissions/roles.js';
import { userRolesEnums } from '@/enums/common.js';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
export default {
  name: 'CreateForm',
  props: ['dialog'],
  data() {
    return {
      userRolesEnums,
    };
  },
  setup(props, context) {
    const displayModal = ref(false);
    let formValues = reactive({});
    const submitted = ref(false);
    const isAdd = ref(true);

    const rules = computed(() => {
      return {
        name: {
          required: helpers.withMessage('Value không được trống', required),
        },
        guard_name: {
          required: helpers.withMessage('Value không được trống', required),
        },
        cn_name: {
          required: helpers.withMessage('Value không được trống', required),
        },
        description: {
          required: helpers.withMessage('Value không được trống', required),
        },
        status: {
          required: helpers.withMessage('Value không được trống', required),
        },
      };
    });
    const v$ = useVuelidate(rules, formValues);

    const formItems = [
      { label: 'Tên', name: 'name' },
      { label: 'Loại', name: 'guard_name' },
      { label: 'Tên chi tiết', name: 'cn_name' },
      { label: 'Mô tả', name: 'description' },
      { label: 'Có thể phân quyền', name: 'status' },
    ];

    watch(displayModal, (newValue) => {
      if (newValue && isAdd.value) {
        handleRefreshForm();
      }
    });

    function handleRefreshForm() {
      submitted.value = false;
      formValues.id = '';
      formValues.name = '';
      formValues.guard_name = '';
      formValues.cn_name = '';
      formValues.description = '';
      formValues.status = true;
    }

    function closeModal() {
      displayModal.value = false;
    }

    function setFormValues(row) {
      formValues.id = row.id;
      formValues.name = row.name;
      formValues.guard_name = row.guard_name;
      formValues.cn_name = row.cn_name;
      formValues.description = row.description;
      formValues.status = row.status;
    }

    function submitModal() {
      submitted.value = true;
      let params = formValues;
      if (!v$.value.$invalid) {
        let func = createRoles;
        if (!isAdd.value) {
          func = updateRoles;
        }
        func(params).then(() => {
          context.emit('onSuccess');
          closeModal();
        });
      }
    }

    return {
      displayModal,
      formValues,
      submitted,
      formItems,
      submitModal,
      closeModal,
      handleRefreshForm,
      setFormValues,
      isAdd,
      v$,
    };
  },
};
</script>

<style lang="scss" scoped>
.button {
  display: block;
}

</style>
