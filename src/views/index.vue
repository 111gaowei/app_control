<template>
  <div class="total">
    <div class="top">
      <div><h2>App数据监控</h2></div>
      <div>
        <img @click="selectApp" :src="appMsg[number].img" alt="" />
        <span style="cursor: pointer" @click="selectApp">{{
          appMsg[number].topName
        }}</span>
        <div class="down" @click="selectApp">
          <img src="../../static/img/down.png" alt="" />
        </div>
      </div>
      <div>
        <span>用户名</span>
        <span class="quit" @click="quit">退出</span>
      </div>
    </div>
    <div class="center">
      <div>
        <span :class="select == 1 ? 'selected' : ''" @click="cate(1)"
          >概述</span
        >
        <span :class="select == 2 ? 'selected' : ''" @click="cate(2)"
          >指标</span
        >
        <!-- 走路有钱的提现 -->
        <span
          v-show="number == 1"
          :class="select == 3 ? 'selected' : ''"
          @click="cate(3)"
          >提现</span
        >
        <!-- aso的审核 -->
        <span
          v-show="number == 2"
          :class="select == 4 ? 'selected' : ''"
          @click="cate(4)"
          >审核</span
        >
      </div>
    </div>
    <div class="mask" v-show="maskShow" @click="mask">
      <el-carousel
        @change="change"
        style="height: 400px"
        direction="vertical"
        :indicator-position="pagecount == 1 ? 'none' : ''"
        :autoplay="false"
        ref="carousel"
      >
        <el-carousel-item
          style="width: 800px; height: 400px; display: flex; flex-wrap: wrap"
          v-for="item in pagecount"
          :key="item"
        >
          <div class="icon" v-for="(item, index) of showMsg" :key="index">
            <img @click="chooseApp(index + page * 15)" :src="item.img" alt="" />
            <div @click="chooseApp(index + page * 15)">{{ item.name }}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>您确认退出登录吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 概述 （其余）-->
    <out-other v-if="select == 1 && number !== 1"></out-other>
    <!-- 概述 （走路有钱）-->
    <out-walk v-if="select == 1 && number == 1"></out-walk>
    <!-- 指标 -->
    <ind-walk ref="child1" :number="number" v-show="select == 2"></ind-walk>
    <!-- 提现 -->
    <with-draw ref="child2" v-show="select == 3 && number == 1"></with-draw>
    <!--aso 审核 -->
    <audit v-show="select == 4 && number == 2"></audit>
  </div>
</template>
<script>
import outWalk from "../components/out_walk.vue";
import outOther from "../components/out_other.vue";
import indWalk from "../components/indicator_walk.vue";
import withDraw from "../components/withdraw.vue";
import audit from "../components/audit.vue";
export default {
  components: {
    outWalk,
    indWalk,
    withDraw,
    outOther,
    audit,
  },
  data() {
    return {
      // 两个app信息
      appMsg: [
        {
          name: "Record Calls",
          topName: "Record Calls - for iPhone",
          img: "./static/img/v2_qgr0t2.png",
        },
        {
          name: "走路有钱",
          topName: "走路有钱",
          img: "./static/img/v2_qgsy0x.png",
        },
        {
          name: "aso平台",
          topName: "aso平台",
          img: "./static/img/logo_blue@2x.png",
        },
        {
          name: "文件压缩解压",
          topName: "文件压缩解压",
          img: "./static/img/wjysjy.png",
        },
        {
          name: "定位朋友",
          topName: "定位朋友",
          img: "./static/img/position@2x.png",
        },
        {
          name: "摄像头检测",
          topName: "摄像头检测",
          img: "./static/img/camera.png",
        },
        {
          name: "极速vpn",
          topName: "极速vpn",
          img: "./static/img/img_subscribed_logo@3x.png",
        },
        {
          name: "超级计算器",
          topName: "超级计算器",
          img: "./static/img/calc.png",
        },
        {
          name: "优惠宝",
          topName: "优惠宝",
          img: "./static/img/youhuibao.png",
        },
        {
          name: "拍译拍",
          topName: "拍译拍",
          img: "./static/img/translate.png",
        },
        {
          name: "放大镜",
          topName: "放大镜",
          img: "./static/img/zoom.png",
        },
        {
          name: "私密相册",
          topName: "私密相册",
          img: "./static/img/secret.png",
        },
        {
          name: "鬼魂探测器",
          topName: "鬼魂探测器",
          img: "./static/img/ghost.png",
        },
      ],
      number: 1, //app分类
      maskShow: false, //遮罩层
      select: 1, //概述，指标，提现等分类
      pagecount: 0,
      showMsg: [],
      page: 0,
      dialogVisible: false,
    };
  },
  mounted() {
    this.pagecount = Math.ceil(this.appMsg.length / 15);
    this.showMsg = this.appMsg.slice(0, 15);
  },
  methods: {
    // 退出
    quit() {
      this.dialogVisible = true;
    },
    logout(){
      this.dialogVisible = true;
      this.$router.push('/')
    },
    change(e) {
      this.page = e;
      this.showMsg = this.appMsg.slice(e * 15, (e + 1) * 15);
    },
    selectApp() {
      this.maskShow = true;
    },
    chooseApp(e) {
      this.number = e;
      this.select = 1;
      this.maskShow = false;
      this.$refs.carousel.setActiveItem(0);
    },
    cate(e) {
      this.select = e;
      this.$refs.child1.clearPage();
      this.$refs.child2.clearPage();
    },
    mask() {
      this.maskShow = false;
      this.$refs.carousel.setActiveItem(0);
    },
  },
};
</script>
<style scoped>
.total {
  width: 100%;
  margin: 0 auto;
}
.total > .top {
  background-color: #fff;
  display: flex;
  padding: 10px 100px;
  max-width: 1400px;
  min-width: 900px;
  margin: 0 auto;
}
.total > .top > div {
  flex: 1;
  align-self: center;
}
.total > .top > div:first-child {
  text-align: left;
}
.total > .top > div:nth-child(2) {
  text-align: center;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.total > .top > div:nth-child(2) > img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
}
.total > .top > div:nth-child(2) > .down {
  width: 32px;
  height: 32px;
  margin-left: 8px;
  cursor: pointer;
}
.total > .top > div:nth-child(2) > .down > img {
  width: 50%;
  margin-top: 8px;
}
.total > .top > div:last-child {
  text-align: right;
  font-size: 14px;
}
.total > .top > div:last-child .quit {
  color: #409eff;
  cursor: pointer;
}
.total > .center {
  background-color: rgba(244, 244, 244, 1);
}
.total > .center > div {
  text-align: left;
  padding: 25px 100px;
  max-width: 1400px;
  min-width: 900px;
  margin: 0 auto;
}
.total > .center > div > span {
  margin-right: 20px;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  color: rgba(174, 174, 174, 1);
  line-height: 24px;
}
.total > .center > div > span.selected {
  color: #409eff;
}
/* 遮罩层 */
.total .mask {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.total .mask > div {
  width: 800px;
  max-height: 900px;
  display: flex;
  flex-wrap: wrap;
  margin: 15% auto;
  align-items: flex-start;
}
.total .mask > div .icon {
  width: 160px;
  height: 100px;
  margin-bottom: 50px;
  text-align: center;
}
.total .mask > div .icon > img {
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
}
.total .mask > div .icon > div {
  font-weight: 400;
  font-size: 14px;
  color: rgb(251, 251, 251);
  line-height: 20px;
  padding-top: 10px;
  cursor: pointer;
}
</style>