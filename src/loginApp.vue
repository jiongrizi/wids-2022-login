<template>
<div>
  <el-row>
    <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
  </el-row>
  <el-row type="flex" class="row-bg" justify="center">  
    <router-view
            keep-alive
            transition="fade"
            transition-mode='out-in'></router-view>
  </el-row>
  <el-row>
    <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
  </el-row>
</div>

</template>
  <style>
    body {
      background-color: #155799;
      background-image: linear-gradient(90deg, #155799, #159957);
    }
  
    .el-card {
      min-width: 380px;
      max-width: 380px;
    }
  </style>



