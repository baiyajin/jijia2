<el-row class="tac">
  <h1>{{ user.name }}</h1>


  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
    <el-radio-button>后台系统</el-radio-button>
  </el-radio-group>

  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
           :collapse="isCollapse">

    <!--分类管理-->
    <el-submenu index="1" @mouseover.native="getMaterialClass">
      <template slot="title">
        <i class="el-icon-menu"></i>
      </template>
      <el-menu-item-group>

          <span slot="title">材料分类
            <el-popover placement="right" width="auto" trigger="click">




              <el-row class="demo-autocomplete">
                  <el-col>
                    <el-autocomplete
                      width="200px"
                      class="inline-input"
                      v-model="state1"
                      :fetch-suggestions="querySearch"
                      placeholder="请输入材料类别名称"
                      @select="handleSelect"
                    >
                      <template slot="prepend">材料类别名称</template>
                    </el-autocomplete>
                     <el-button type="primary" icon="el-icon-circle-check" @click.native="addMaterialClass">保存</el-button>
                  </el-col>
              </el-row>


                  <el-button type="primary" slot="reference" icon="el-icon-circle-plus" size="mini">增加</el-button>
            </el-popover>
          </span>

        <el-menu-item v-for="(item,index) in MaterialClass" :key="index">{{item.value}}
          <el-button  type="primary" class="el-icon-edit"></el-button>
          <el-button  type="primary" class="el-icon-delete"></el-button>
          <el-button @click.native="hint_success('材料类别id'+item.id)" type="primary" class="el-icon-view"></el-button>
        </el-menu-item>

      </el-menu-item-group>
    </el-submenu>

    <!--用户管理-->
    <el-submenu index="2" @mouseover.native="getMaterialClass">
      <template slot="title">
        <i class="el-icon-setting"></i>
      </template>
      <el-menu-item-group>

        <span slot="title">管理员模块</span>

        <el-submenu index="2-1">
          <span slot="title">选项4</span>
          <el-menu-item index="2-1-1">选项1</el-menu-item>
        </el-submenu>

      </el-menu-item-group>
    </el-submenu>


  </el-menu>

  <!--<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>-->
  <el-dialog title="管理员登录" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :visible.sync="dialogFormVisible">
    <el-form :model="user">
      <el-form-item label="手机号：" :label-width="formLabelWidth">
        <el-input v-model="user.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密    码：" :label-width="formLabelWidth">
        <el-input v-model="user.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="checkLogin2">登 录</el-button>
    </div>
  </el-dialog>

</el-row>


<script>

  import BYJUtil from '../Util/BYJUtil.vue'
  var UserINFO;

  export default {
    data() {
      return {
        isCollapse: false,
        MaterialClass: null,
        state1: '',
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        dialogFormVisible: false,
        user: {
          phone: '',
          password: '',
          name: ''
        },
        formLabelWidth: '120px'
      };
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      getMaterialClass() {
        if (this.MaterialClass === null) {
          this.$axios.post('/PageMaterialClassController/getMaterialClass', {}).then(res => {
            var vaArray = [];
            res.data.forEach(item => {
              if (item.name) {
                vaArray.push({"value":item.name,"id":item.id});
              }
            })
            this.MaterialClass = vaArray;
          }).catch(err => {
            console.log(err)
          })
        }
      },
      addMaterialClass() {

        if(this.state1 === ''){
          this.hint_error("请输入材料类别名称");
          return
        }

        for (let i in this.MaterialClass) {
          if(this.MaterialClass[i].value.indexOf(this.state1) === 0){
            this.hint_error("材料类别名称已经存在，不能重复，请换一个");
            return
          }
        }

        this.MaterialClass.push({"value":this.state1});
        this.hint_success(this.state1+"  材料类   增加成功");



      },
      querySearch(queryString, cb) {
        var results = queryString ? this.MaterialClass.filter(this.createFilter(queryString)) : this.MaterialClass;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (MaterialClass) => {
          return (MaterialClass.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        // console.log("你选择了"+item.value);
      },
      logout() {
        console.log(2);
        this.dialogFormVisible = false
      },
      checkLogin2() {
        localStorage.setItem("UserINFO", "");
        var check = true;

        if(!this.user.phone){
          this.hint_error("请输入手机号")
          return check = false;
        }

        if(!BYJUtil.checkPhone(this.user.phone)){
          this.hint_error("手机号格式不对")
          return check = false;
        }

        if(!this.user.password){
          this.hint_error("请输入密码")
          return check = false;
        }


        //校验通过，继续执行业务逻辑
        if (check) {

          this.$axios.post('/SystemUserController/login', {"phone":this.user.phone,"password":this.user.password,}).then(res => {
            if(res.data.result === 0){
              this.hint_success(res.data.message)

              //取时必须JSON.parse()拿,字符串的json就被转换成对象，就可以用对象的方式取值了
              localStorage.setItem("UserINFO",JSON.stringify(res.data.user));
              UserINFO = res.data.user;
              this.dialogFormVisible = false
            }else{
              this.hint_error(res.data.message)
            }

          }).catch(err => {
            console.log(err)
          })
        }
      }
    },
    /*vue初始化生命周期*/
    created(){
      if (null !== localStorage.getItem("UserINFO") && "" !== localStorage.getItem("UserINFO") && undefined !== localStorage.getItem("UserINFO")) {
        UserINFO = JSON.parse(localStorage.getItem("UserINFO"));
        console.log(UserINFO.phone)
        console.log(UserINFO.name)
        this.user = UserINFO;
      }else{
        // - 打开登录屏
        this.dialogFormVisible = true;
      }
    }

  }

</script>
