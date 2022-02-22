<template>
  <div class="homePage overflow-y">
    <div class="search">
      <nav>
        <div class="back" >
            <router-link :to="`/employees`">
          <img src="@/assets/left-arrow-15.png" alt="" srcset="">
            
          Back
          </router-link>
        </div>
        <div class="srch">
        </div>
      </nav>
    </div>
    <table class="table">
      <thead>
        <tr scope="row">
          <th scope="col">Id</th>
          <th scope="col">Date</th>
          <th scope="col">location</th>
          <th scope="col">Purpose</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="checkin in checkinsList" :key="checkin.id">
          <tr scope="row" >
           
            <td scope="col">
              <h1 class="fs-13 fw-600">
                {{ checkin.id }}
              </h1>
            </td>
             <td scope="col">
              <h1 class="fs-13 fw-600">{{ new Date(checkin.checkin).toLocaleString('default', { month: 'long', day: 'numeric',year:'numeric'}) }}</h1>
            </td>
            <td scope="col">
               <h1 class="fs-13 fw-600">{{ checkin.location }}</h1>
            </td>
             <td scope="col">
               <h1 class="fs-13 fw-600">{{ checkin.purpose }}</h1>
            </td>
          </tr>
       
        </template>
      </tbody>
    </table>
    <div class="pagination">
        <div class="previous"></div>
        <div class="first"></div>
        <div class="second"></div>
        <div class="third"></div>
        <div class="next"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "EmployeeCheckins",
  computed:{
    ...mapState({
      checkinsList: state => state.EmployeeCheckins.checkinsList,
    }),
  },
  async mounted(){
    try {
      let vm = this;
      await vm.$store.dispatch(
        "EmployeeCheckins/fetchemployeeCheckins",
            vm.$route.params.employeeId
      )
    } catch (err) {
      console.error("error fetching checkins -", err);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
/* .addbtn > span {
  cursor: pointer;
  font-size: 20px;
  color: white;
}

.addbtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  background-color: #0050b3;
} */

.table {
  width: 100%;
}
.table thead tr th {
  border: none;
  font-size: 14px;
  color: #4a6177;
  text-align: start;
}

/* .table thead tr th img {
  width: 6px;
  height: 7px;
  margin-left: 5px;
} */

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
  /* justify-content: center; */
  align-items: center;
}
.toggleImg {
  width: 10px;
  margin-right: 10px;
  cursor: pointer;
}
.toggledRow {
  background-color: white;
  border-radius: 10px;
  height: 50px;
}
.rowOpened td {
  padding-bottom: 10px !important;
}
.toggledRow td{
  padding: 0!important;
}
.detail{
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
}
.detail .details{
  margin: 20px;
}
.back{
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
}
.back img{
    width: 12px;
margin-right: 5px;
}
a{
  text-decoration: none;
  color: #4a6177;
}

</style>
