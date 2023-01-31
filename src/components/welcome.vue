<template>
  <!--动态将图片轮播图的容器高度设置成与图片一致-->

    <div> <el-carousel :interval="2000" type="card" height="300px">
      <el-carousel-item v-for="item in imagebox" :key="item.id">
        <img :src="item.idView" class="image">
      </el-carousel-item>
    </el-carousel>
    <br>
    <br>
  

   <p> 帕金森病（Parkinson’s disease，PD）是一种常见的神经系统变性疾病，老年人多见，平均发病年龄为60岁左右，40岁以下起病的青年帕金森病较少见。我国65岁以上人群PD的患病率大约是1.7%。大部分帕金森病患者为散发病例，仅有不到10%的患者有家族史。帕金森病最主要的病理改变是中脑黑质多巴胺（dopamine, DA）能神经元的变性死亡，由此而引起纹状体DA含量显著性减少而致病。导致这一病理改变的确切病因目前仍不清楚，遗传因素、环境因素、年龄老化、氧化应激等均可能参与PD多巴胺能神经元的变性死亡过程。</p>
   <br>
 <a href="https://www.cast.org.cn/art/2020/4/10/art_1350_118453.html" style="display:block">了解更多</a>
   <br>
 
<a href="https://www.haodf.com/jibing/pajinsen_yiyuan_fujian_2_all_all_1.htm?hezsrc=alading" style="display:block">帕金森治疗医院推荐</a>

 
    
   
    </div>
  

</template>
 

<script>
    export default {
    name: 'welcome',
    data() {
      return {
         imagebox:[{id:0,idView:require('../assets/img/1.jpeg')},
        {id:1,idView:require('../assets/img/2.jpeg')},
        {id:2,idView:require('../assets/img/3.jpeg')},
        {id:3,idView:require('../assets/img/4.jpeg')},
        //imagebox是assets下一个放图片的文件夹
        ],
         screenWidth :0
      }
    },
    methods:{
              setSize:function () {
                // 通过浏览器宽度(图片宽度)计算高度
                this.bannerHeight = 400 / 1920 * this.screenWidth;
              },
            },
     mounted() {
              // 首次加载时,需要调用一次
              this.screenWidth =  window.innerWidth;
              this.setSize();
              // 窗口大小发生改变时,调用一次
              window.onresize = () =>{
              this.screenWidth =  window.innerWidth;
              this.setSize();
            }
          }
    }
</script>

<style lang='less' scoped>
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
  p{
    font-family:"Hiragino Sans GB" ;
    white-space:pre-wrap;word-break: break-all;
  }
</style>