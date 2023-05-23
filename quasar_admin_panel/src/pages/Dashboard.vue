<template>
  <div class="dashboard-row">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Пользователи</h5>
        <p class="card-data">{{ this.usersCount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import db from "src/db";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  mounted() {
    db.updateDb();
    this.usersCount = db.usersList.length;
  },
  data() {
    return {
      usersCount: 0,
    };
  },
};
</script>

<style scoped>
@media (min-width: 1200px) {
  .col-xl-3 {
    flex: 0 0 auto;
    width: 25%;
  }
}
@media (min-width: 576px) {
  .col-sm-6 {
    flex: 0 0 auto;
    width: 50%;
  }
}
.dashboard-row {
  flex-shrink: 0;
  margin-top: 0;
  max-width: 100%;
  padding-left: calc(24px * 0.5);
  padding-right: calc(24px * 0.5);
  width: 100%;
  background: transparent;
}

.card {
  box-shadow: 0 0 0.875rem 0 rgba(34, 46, 60, 0.05);
  margin-bottom: 24px;
  max-width: 400px;
  word-wrap: break-word;
  background-clip: border-box;
  background-color: #222e3c;
  border: 0 solid transparent;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  min-width: 0;
  position: relative;
}
.card-body {
  flex: 1 1 auto;
  padding: 1.25rem;
}
.card-title {
  color: #d3d5d8;
  font-size: 0.925rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  margin-top: 0;
}
.card-data {
  margin-bottom: 1rem !important;
  margin-top: 0.25rem !important;
  font-size: 1.75rem;
  color: #fff;
  font-weight: 400;
  line-height: 1.2;
}
</style>
