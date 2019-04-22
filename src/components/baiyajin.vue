
<template>
<div>



  <div class="box">
    <el-color-picker :click="style.background.background = style.color.color" v-model="style.color.color" class="one"></el-color-picker>
    <div class="one" :style="style.color">
      <el-popover
        placement="top"
        width="160"
        v-model="visible2">
        <div style="text-align: center; margin: 5px">

          <el-popover
            placement="bottom"
            :title="user.name"
            width="200"
            trigger="click">
            <el-col v-for="(value, key, index) in user" :key="index">
              <el-card shadow="hover">{{ key }} ： {{ value }}</el-card>
            </el-col>
            <el-button slot="reference" type="primary" size="mini" @click="visible2 = false">个人信息</el-button>
          </el-popover>

          <el-button type="primary" size="mini" @click="logout" >注销</el-button>
        </div>
        <el-button slot="reference" :style="style.color">{{ user.name }}<i class="el-icon-loading"></i></el-button>
      </el-popover>
      </div>
  </div>

  <div class="line"></div>

  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in 4" :key="item" :style="style.background">
      <h3 style="color:white">消息{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>

  <div class="line"></div>


  <el-row>
    <el-button type="info" :style="style.background">管理员模块</el-button>
    <el-button type="danger" :style="style.background">权限模块</el-button>
    <el-button type="primary" :style="style.background">用户管理</el-button>
    <el-button type="success" :style="style.background">报告模块</el-button>
    <el-button type="warning" :style="style.background">帮助模块</el-button>
  </el-row>

  <!--登录-->
  <el-dialog title="管理员登录" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :visible.sync="dialogFormVisible">
    <el-form :model="user">
      <el-form-item label="手机号：" :label-width="formLabelWidth">
        <el-input v-model="user.phone" :value="user.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密    码：" :label-width="formLabelWidth">
        <el-input type="password" v-model="user.password" :value="user.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="checkLogin2">登 录</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>

  import BYJUtil from '../Util/BYJUtil.vue'
  var UserINFO;

  export default {
    data() {
      return {
        style:{
          color:{color: ""},
          background:{background: ""},
        },
        visible2: false,
        formLabelWidth: '120px',
        dialogTableVisible: false,
        dialogFormVisible: false,
        user: {
          phone: '',
          password: '',
          name: ''
        },
      };
    },

    methods: {

      logout() {
        this.visible2 = false
        localStorage.setItem("UserINFO","");
        this.dialogFormVisible = true
        this.user.name = ""
        this.user.phone = localStorage.getItem("phone")
        this.user.password = localStorage.getItem("password")
      },
      checkLogin2() {
        localStorage.setItem("UserINFO", "");
        var check = true;

        if(!this.user.phone){
          BYJUtil.hint_error(this,"请输入手机号")
          return check = false;
        }

        if(!BYJUtil.checkPhone(this.user.phone)){
          BYJUtil.hint_error(this,"手机号格式不对")
          return check = false;
        }

        if(!this.user.password){
          BYJUtil.hint_error(this,"请输入密码")
          return check = false;
        }


        //校验通过，继续执行业务逻辑
        if (check) {

          localStorage.setItem("phone",this.user.phone);
          localStorage.setItem("password",this.user.password);
          this.style.color.color = this.style.background.background = BYJUtil.getRandmColor(0.8);

          this.$axios.post('/SystemUserController/login', {"phone":this.user.phone,"password":this.user.password,}).then(res => {
            if(res.data.result === 0){
              BYJUtil.hint_success(this,res.data.message)

              //取时必须JSON.parse()拿,字符串的json就被转换成对象，就可以用对象的方式取值了
              localStorage.setItem("UserINFO",JSON.stringify(res.data.user));
              UserINFO = res.data.user;
              this.user.name = UserINFO.name
              this.dialogFormVisible = false
            }else{
              BYJUtil.hint_error(this,res.data.message)
            }

          }).catch(err => {
            BYJUtil.hint_error(this,err.message)
          })
        }
      }
    },
    /*vue初始化生命周期*/
    created(){

      this.style.color.color = this.style.background.background = BYJUtil.getRandmColor(0.8);
      if (null !== localStorage.getItem("UserINFO") && "" !== localStorage.getItem("UserINFO") && undefined !== localStorage.getItem("UserINFO")) {
        UserINFO = JSON.parse(localStorage.getItem("UserINFO"));
        this.user = UserINFO;
      }else{
        // - 打开登录屏
        this.dialogFormVisible = true;
        this.user.phone = localStorage.getItem("phone")
        this.user.password = localStorage.getItem("password")
      }
    }

  }
</script>

<!--走马灯-->
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  /*4.弹性布局display:flex*/
   *{margin:0;padding:0;font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;}
  .box{display:flex;flex-direction:row;}
  .one{flex:1;line-height: 40px;}
  h3.one{line-height: 40px;}

  .line {
    padding: 5px;
  }

  .el-row .el-button{
    padding: 30px;
    margin: 10px;
  }

  .el-card__body {
    padding: 5px 25px;
  }
</style>



