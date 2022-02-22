<template>
  <div class="homePage overflow-y">
    <div class="search">
      <nav>
        <h5>Employees</h5>

        <div class="srch">
          <input
            v-model="searchText"
            v-on:keyup="searchEmployeeList"
            type="text"
            placeholder="Search"
          />
        </div>
      </nav>
    </div>
    <div class="tableWarapper">
      <table class="table">
        <thead>
          <tr scope="row">
            <th scope="col"></th>
            <th scope="col">
              Id
              <img class="orderbyImg" v-on:click="sortingBy('id')" :class="{desc: sorting.sortBy=='id' && sorting.orderBy=='desc'}" src="@/assets/up-arrow.png" alt="" />
            </th>
            <th scope="col"></th>
            <th scope="col">Name
              <img class="orderbyImg" v-on:click="sortingBy('name')" :class="{desc: sorting.sortBy=='name' && sorting.orderBy=='desc'}" src="@/assets/up-arrow.png" alt="" />

            </th>
            <th scope="col">Department</th>
            <th scope="col">Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="employee in employeeList" :key="employee.id">
            <tr scope="row" :class="{ rowOpened: opened.includes(employee.id) }">
              <td>
                <img
                  @click="toggle(employee.id)"
                  class="toggleImg"
                  :class="{ opened: opened.includes(employee.id) }"
                  src="@/assets/icon_down.png"
                  alt=""
                />
              </td>
              <td scope="col">
                <h1 class="fs-13 fw-600">
                  {{ employee.id }}
                </h1>
              </td>
              <td scope="col">
                <img class="pImg" v-bind:src="employee.avatar" alt="" />
              </td>
              <td scope="col">
                <h1 class="fs-13 fw-600">{{ employee.name }}</h1>
              </td>
              <td scope="col">
                <h1 class="fs-13 fw-600">
                  <span v-for="(dep, index) in employee.department" :key="index">
                    <span v-if="index != 0">, </span>
                    {{ dep }}
                  </span>
                </h1>
              </td>
              <td scope="col">
                <h1 class="fs-13 fw-600">{{ employee.email }}</h1>
              </td>
              <td>
                <router-link :to="`/employee-checkins/${employee.id}`">
                  View Checkins <img src="@/assets/right-arrow.png" alt="" srcset="" />
                </router-link>
              </td>
            </tr>
            <tr v-if="opened.includes(employee.id)" class="toggledRow">
              <td colspan="7">
                <div class="detail">
                  <div class="details">
                    <h1 class="fs-13">
                      <span class="fw-600 mb-10">Country : </span>{{ employee.country }}
                    </h1>
                  </div>

                  <div class="details">
                    <h1 class="fs-13">
                      <span class="fw-600 mb-10">Birthday : </span
                      >{{
                        new Date(employee.birthday).toLocaleString("default", {
                          month: "long",
                          day: "numeric",
                        })
                      }}
                    </h1>
                  </div>
                  <div class="details">
                    <h1 class="fs-13">
                      <span class="fw-600 mb-10">Contact : </span>{{ employee.phone }}
                    </h1>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="pageDiv">
      <v-pagination
        v-model="currentPage"
        :pages="10"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="fetchEmployeeList"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
export default {
  name: "EmployeeList",
  components: {
    VPagination,
  },
  data() {
    return {
      currentPage: 1,
      searchText: "",
      opened: [],
      sorting:{
        sortBy:'',
        orderBy:''
      }
    };
  },
  computed: {
    ...mapState({
      employeeList: (state) => state.EmployeeList.employeeList,
    }),
  },
  async mounted() {
    if (!this.$store.state.employeeList) {
      this.fetchEmployeeList();
    }
  },
  methods: {
    toggle(id) {
      const index = this.opened.indexOf(id);
      if (index > -1) {
        this.opened.splice(index, 1);
      } else {
        this.opened.push(id);
      }
    },
    async fetchEmployeeList() {
      try {
        let vm = this;
        await vm.$store.dispatch("EmployeeList/fetchemployeeList", {
          page: this.currentPage,
          searchText: this.searchText,
          sortBy: this.sorting.sortBy,
          orderBy:this.sorting.orderBy
        });
      } catch (err) {
        console.error("error fetching employees -", err);
      }
    },
    searchEmployeeList() {
      this.currentPage = 1;
      this.sorting={
        sortBy:'',
        orderBy:''
      }
      this.fetchEmployeeList();
    },
    sortingBy(sortBy){
      this.currentPage = 1;
      this.sorting.sortBy=sortBy;
      if(this.sorting.orderBy=='' || this.sorting.orderBy=='asc'){
        this.sorting.orderBy='desc';
      }
      else{
        this.sorting.orderBy='asc';
      }
      this.fetchEmployeeList();
    }
  },
};
</script>
<style scoped>
.homePage {
  width: 100%;
  height: 100%;
}
.search {
  position: sticky;
  top: 0;
  padding-top: 0;
  z-index: 2;
  background-color: #f5f5f5;
  box-shadow: 0px 25px 12px #f5f5f5;
}
.search nav {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cfcfcf;
  margin-bottom: 30px;
}

.search nav h5 {
  font-weight: 500;
  font-size: 1rem;
}
.search .srch {
  position: relative;
  display: flex;
  align-items: center;
}

.search input {
  width: 300px;
  height: 30px;
  border-radius: 5px;
  outline: none;
  border: none;
  padding: 0px 30px;
  background-color: #eeeeee;
  margin-right: 50px;
}
.table {
  width: 100%;
}
.table thead tr th {
  border: none;
  font-size: 14px;
  color: #4a6177;
  text-align: start;
}

.table tbody tr td .pImg {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  float: right;
  margin-right: 10px;
}

.table tbody tr td {
  border: none;
  font-size: 13px;
  font-weight: 300;
  padding: 20px 0;
}
.d-flex {
  display: flex;
  align-items: center;
}
.toggleImg {
  width: 10px;
  margin-right: 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.orderbyImg {
  height: 10px;
  margin-left: 5px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.toggledRow {
  background-color: white;
  border-radius: 10px;
  height: 50px;
}
.rowOpened td {
  padding-bottom: 10px !important;
}
.toggledRow td {
  padding: 0 !important;
}
.detail {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
}
.detail .details {
  margin: 20px;
}
.opened,.desc {
  transform: rotate(180deg);
}
a {
  text-decoration: none;
  color: #4a6177;
}
.pageDiv {
  position: fixed;
  bottom: 0;
  padding: 15px 0;
  width: 100%;
  background-color: white;
}
.tableWarapper {
  margin-bottom: 30px;
}
</style>
