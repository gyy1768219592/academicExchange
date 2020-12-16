<template>
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="Tab 1">
        Content of Tab Pane 1
        <div id="main"></div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render>
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3"> Content of Tab Pane 3 </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";

export default {
  data() {
    return {
      chart: null,
      cloudData: [
        {
          name: "生活资源",
          value: "999"
        },
        {
          name: "供热管理",
          value: "888"
        },
        {
          name: "供气质量",
          value: "777"
        },
        {
          name: "生活用水管理",
          value: "688"
        },
        {
          name: "一次供水问题",
          value: "588"
        },
        {
          name: "交通运输",
          value: "516"
        },
        {
          name: "城市交通",
          value: "515"
        },
        {
          name: "环境保护",
          value: "483"
        },
        {
          name: "房地产管理",
          value: "462"
        },
        {
          name: "城乡建设",
          value: "449"
        },
        {
          name: "社会保障与福利",
          value: "429"
        },
        {
          name: "社会保障",
          value: "407"
        },
        {
          name: "文体与教育管理",
          value: "406"
        },
        {
          name: "公共安全",
          value: "406"
        },
        {
          name: "公交运输管理",
          value: "386"
        },
        {
          name: "出租车运营管理",
          value: "385"
        },
        {
          name: "供热管理",
          value: "375"
        },
        {
          name: "市容环卫",
          value: "355"
        },
        {
          name: "自然资源管理",
          value: "355"
        },
        {
          name: "粉尘污染",
          value: "335"
        },
        {
          name: "噪声污染",
          value: "324"
        },
        {
          name: "土地资源管理",
          value: "304"
        },
        {
          name: "物业服务与管理",
          value: "304"
        },
        {
          name: "医疗卫生",
          value: "284"
        },
        {
          name: "粉煤灰污染",
          value: "284"
        },
        {
          name: "占道",
          value: "284"
        },
        {
          name: "供热发展",
          value: "254"
        },
        {
          name: "农村土地规划管理",
          value: "254"
        },
        {
          name: "生活噪音",
          value: "253"
        },
        {
          name: "供热单位影响",
          value: "253"
        },
        {
          name: "城市供电",
          value: "223"
        },
        {
          name: "房屋质量与安全",
          value: "223"
        },
        {
          name: "大气污染",
          value: "223"
        },
        {
          name: "房屋安全",
          value: "223"
        },
        {
          name: "文化活动",
          value: "223"
        },
        {
          name: "拆迁管理",
          value: "223"
        },
        {
          name: "公共设施",
          value: "223"
        },
        {
          name: "供气质量",
          value: "223"
        },
        {
          name: "供电管理",
          value: "223"
        },
        {
          name: "燃气管理",
          value: "152"
        },
        {
          name: "教育管理",
          value: "152"
        },
        {
          name: "医疗纠纷",
          value: "152"
        },
        {
          name: "执法监督",
          value: "152"
        },
        {
          name: "设备安全",
          value: "152"
        },
        {
          name: "政务建设",
          value: "152"
        },
        {
          name: "县区、开发区",
          value: "152"
        },
        {
          name: "宏观经济",
          value: "152"
        },
        {
          name: "教育管理",
          value: "112"
        },
        {
          name: "社会保障",
          value: "112"
        },
        {
          name: "生活用水管理",
          value: "112"
        },
        {
          name: "物业服务与管理",
          value: "112"
        },
        {
          name: "分类列表",
          value: "112"
        },
        {
          name: "农业生产",
          value: "112"
        },
        {
          name: "二次供水问题",
          value: "112"
        },
        {
          name: "城市公共设施",
          value: "92"
        },
        {
          name: "拆迁政策咨询",
          value: "92"
        },
        {
          name: "物业服务",
          value: "92"
        },
        {
          name: "物业管理",
          value: "92"
        },
        {
          name: "社会保障保险管理",
          value: "92"
        },
        {
          name: "低保管理",
          value: "92"
        },
        {
          name: "文娱市场管理",
          value: "72"
        },
        {
          name: "城市交通秩序管理",
          value: "72"
        },
        {
          name: "执法争议",
          value: "72"
        },
        {
          name: "商业烟尘污染",
          value: "72"
        },
        {
          name: "占道堆放",
          value: "71"
        },
        {
          name: "地上设施",
          value: "71"
        },
        {
          name: "水质",
          value: "71"
        },
        {
          name: "无水",
          value: "71"
        },
        {
          name: "供热单位影响",
          value: "71"
        },
        {
          name: "人行道管理",
          value: "71"
        },
        {
          name: "主网原因",
          value: "71"
        },
        {
          name: "集中供热",
          value: "71"
        },
        {
          name: "客运管理",
          value: "71"
        },
        {
          name: "国有公交（大巴）管理",
          value: "71"
        },
        {
          name: "工业粉尘污染",
          value: "71"
        },
        {
          name: "治安案件",
          value: "71"
        },
        {
          name: "压力容器安全",
          value: "71"
        },
        {
          name: "身份证管理",
          value: "71"
        },
        {
          name: "群众健身",
          value: "41"
        },
        {
          name: "工业排放污染",
          value: "41"
        },
        {
          name: "破坏森林资源",
          value: "41"
        },
        {
          name: "市场收费",
          value: "41"
        },
        {
          name: "生产资金",
          value: "41"
        },
        {
          name: "生产噪声",
          value: "41"
        },
        {
          name: "农村低保",
          value: "41"
        },
        {
          name: "劳动争议",
          value: "41"
        },
        {
          name: "劳动合同争议",
          value: "41"
        },
        {
          name: "劳动报酬与福利",
          value: "41"
        },
        {
          name: "医疗事故",
          value: "21"
        },
        {
          name: "停供",
          value: "21"
        },
        {
          name: "基础教育",
          value: "21"
        },
        {
          name: "职业教育",
          value: "21"
        },
        {
          name: "物业资质管理",
          value: "21"
        },
        {
          name: "拆迁补偿",
          value: "21"
        },
        {
          name: "设施维护",
          value: "21"
        },
        {
          name: "市场外溢",
          value: "11"
        },
        {
          name: "占道经营",
          value: "11"
        },
        {
          name: "树木管理",
          value: "11"
        },
        {
          name: "农村基础设施",
          value: "11"
        },
        {
          name: "无水",
          value: "11"
        },
        {
          name: "供气质量",
          value: "11"
        },
        {
          name: "停气",
          value: "11"
        },
        {
          name: "市政府工作部门（含部门管理机构、直属单位）",
          value: "11"
        },
        {
          name: "燃气管理",
          value: "11"
        },
        {
          name: "市容环卫",
          value: "11"
        },
        {
          name: "新闻传媒",
          value: "11"
        },
        {
          name: "人才招聘",
          value: "11"
        },
        {
          name: "市场环境",
          value: "11"
        },
        {
          name: "行政事业收费",
          value: "11"
        },
        {
          name: "食品安全与卫生",
          value: "11"
        },
        {
          name: "城市交通",
          value: "11"
        },
        {
          name: "房地产开发",
          value: "11"
        },
        {
          name: "房屋配套问题",
          value: "11"
        },
        {
          name: "物业服务",
          value: "11"
        },
        {
          name: "物业管理",
          value: "11"
        },
        {
          name: "占道",
          value: "11"
        },
        {
          name: "园林绿化",
          value: "11"
        },
        {
          name: "户籍管理及身份证",
          value: "11"
        },
        {
          name: "公交运输管理",
          value: "11"
        },
        {
          name: "公路（水路）交通",
          value: "11"
        },
        {
          name: "房屋与图纸不符",
          value: "11"
        },
        {
          name: "有线电视",
          value: "11"
        },
        {
          name: "社会治安",
          value: "11"
        },
        {
          name: "林业资源",
          value: "11"
        },
        {
          name: "其他行政事业收费",
          value: "11"
        },
        {
          name: "经营性收费",
          value: "11"
        },
        {
          name: "食品安全与卫生",
          value: "11"
        },
        {
          name: "体育活动",
          value: "11"
        },
        {
          name: "有线电视安装及调试维护",
          value: "11"
        },
        {
          name: "低保管理",
          value: "11"
        },
        {
          name: "劳动争议",
          value: "11"
        },
        {
          name: "社会福利及事务",
          value: "11"
        },
        {
          name: "一次供水问题",
          value: "11"
        }
      ],
      img:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO4AAADICAYAAADvG90JAAAWNElEQVR4Xu2dedS/5ZzHX/6YmVJRKi1ojwqjydaqIilJacgkhFSYM5UkSyiFSpaypIXRiJBjyJqTZBjLjL2hxZpMRqEkSxznzJz3dH1PT0/P83zv5bqv5b7fn3O+5+l3uu/r8/m8r/t9L9f1We6GxQgYgeoQuFt1FttgI2AEMHF9ERiBChEwcSucNJtsBExcXwNGoEIETNwKJ80mGwET19dAbAS2BDYNv/sA9wLWAtYEVpuj7M/Ab8LvZuB64Mrw+3lsQ2sez8Stefby2r4TsBtw/wVEve+AJv0C+BxwOfAZ4GcD6ip+aBO3+CkqxsB1gKcBewK7Aqtntuwa4JPA24CfZLYluXoTNznkVSlcA/h74OnAYwq2/ELgNcBVBdsY1TQTNyqcoxnsAcAxgbB3r8grvUafCVxckc2dTDVxO8E22pM2CRf+Eyv38EvAUcA3KvdjWfNN3LHObHu/TgJe2f60os/Q6/PYfPp/wE3coq+7JMZtD7wf0NN2jPKFsKimraXSZGNgL+BfgNvaGGfitkFrfMe+FDhlfG7dxaNbgBcAWsTKLdrXfirwDGAH4BHA19oaZeK2RWwcx2vB6WOFrxQPgfR5wOFDDDxnTAWePBn4h/CEnR1+EPCBLvYMQdytp7Qs3wX0As5RIMPuBdiRw4QvA/uE6Kyh9e8NHBy21FZZpExrCid0NWAI4upOrjvM/sCtXQ3zeYMhoK2S2leN+4KjMMpdgJv6DrTE+YooU6CKnqYK9VxKPgQc2Ed3bOJuGOJLZdN3wmuBQtUsZSBwLnBYGaZkt+KK8NYRg7wK+3xm+G7daI5nXwce3tf72MQ9GnjzAqO0krcHcHVfQ31+bwQOAD7ce5RxDaCHi67PX3Vwa/0QoKJX4W0bnq/46ocCv2x4/LKHxSbuUt9OyvJ4PPDVvsb6/M4IKPj/v0KGTudBRnqiyKstsSbbMfcMC0xaFW67RqDxHwnoSd9bYhJ3XeDGZSz6Y3BY37+W9AhcBjw6vdpqNCrS6uSQdbSU0SLpc8O3a1en9gU+0fXkxefFJO6hwDvnGPY84JxYxnucRggcApzf6EgfpLfD2RPxr4ENIgWmHAu8MSa8MYnbdLXydcDxMZ3wWMsisCrwY0DfY5Y8CLwbeE5s1TGJ+78tjNNyuFbhmnxXtBjWhy5C4MQ+e4VGszcCegXfufcoSwwQi7jK1fxsSwMV5qX3/htanufDmyGwXkgw11PXkh4BJfdrBVmv39ElFnFPB/Qe31ZUR+hxwHfbnujj5yLwcuC1c4/yAUMg8NuwV/v9IQbXmLGIq62GB3U08vdhtc4rzh0BXOY0VYPYKu6QHq0hAtob1kr+YBKDuMp2+HUEC18GnBphHA9x+yuaInQs6RFQZNq83ZXeVsUgruJeY5UK6R3D2RuRcQxwRqgAMQ5v6vFCuL8whbkxiHsacFxEYxVhtd8KwRwRVY12KMWHa3HKkg6BSwBlAyWRGMRVhQFlWsQUXXgi73/GHHQiYz3Qi33JZ1rZRgpn/F0qzTGIq8WloSoBvgh4UyowRqLn+cBZI/GlBjeUoPAw4Kc9jd0GUHVNBcwofnpF6UtcKRo680erzcpv1A3CMh8BVVRQELwlDQJtSs8oSUG7L1rtF3dmf5UWKGm8xtOXuE8BLkqAj6rWKzF/6JtEAlcGV/E/DnEcHOOZAj1QVGhvsYiIWwSSiqD6t56o2oFZTrQS3ThXui9xXwW8OhFMeuIq5jPFjSKRS9HVbA78MPqoHnApBPQJp/xmkVK/Bweydtk7f0vbXYC+xNXdRgWwUkprJ1Mal1mXFvQ+mtkGq2+HgGIXFMPQSvoSV5Xit2ulMc7B3wrfcT+IM9xoRlHbkKjpY6NBpkxHVKxdRdtbS1/iql7tPVprjXOCkvO16vyOOMONYhStJmtV2VI+AgrUUMBGJ+lDXK2QqQlxblGrRSWLxwi7zO1LX/3qG6s2mJayEdDN9ew+JvYhrlbNSnlVVckcrfANGtjdB+hE5/4I2CyRLqvphoBalr6v26l3nNWHuIoUKa0AnJoc/1NfUCo+v00xg4rdrNZ07a9H2RXpQ9xHAf9WIIR6C1B1jdJuKimgMnFToNxNhyqdfrrbqXc9qw9x1bBI7RxKFRWle/GEuilokVCLhZbyEIien9uHuKrGXnoSgJIVjggNrsqbzrgW3dtlgOICGmE01VRTxtDnI4x1pyH6EPdvmwRDxza443iKcFGbxeXqPncctqjT7gdcV5RF0zZG5WtUlmmQT7Y+xFVol8qj1CICUnnDY63rXNIqfy3XxFB26pNFBei/OZSCPsRVrV4FtNcmAlPB3IOBmgkQ5+FmAn6RWsUTaOFWObqDSR/iyqiaVzHVue4lhQSRxJjgmj5dYvhb4hh6kKldibLZBpW+xFXy8Ly2goM60HNwtVhUGdMxvD4rz1PVNi15EFAnvl1DLevBLehLXIUban+qdtHq+FFDLSQkAidFUYNErlSnRrEDetKqrWwS6Utc9QFqnZKUxLNuSnQjUsaGso9qk01S3e1rA2Zge/UtK9Im3bHoS1xtLF86MDA5hv/XQOBBFxgiO7ZSm9PIqjxcQODbgNrvxOhq3wrUvsRVX5o/tNJY18EXhgofg7WSiAjH6hOKEosIW+ehRNZNAW0zJpe+xJXBCppW7akxi4p4nVLBK3TNq/y1XT9ajMq2MBuDuDsCaic4Bbk8lIuN1lk8MmgmbmRAVxhOZVn1eZJFYhBXhmvfalZiMosjiZWqu+CZgEqhJiuC3cBH2bJag+N8SH8EVLxQnydZJBZxp1qEW9/3Ks72HkDVJ3LLL4F1chsxIf2x+NMasliKVwGunXi/GpFGBP4goKbdOURJBko2sKRBIBZ/WlsbU7Gyb97e2oJxnqCbmMqT6FU6ZdNurX5vOU5Ii/RKrXdUtDC5xCSujFffEy2RW+5AQHvBWpX+SII0yCtCYW7jnwYBFS+4NY2qO2uJTVwVR1+qJUMO30rUqS4DIrD6If37AAb+B6BeNpY0CKyZq+pIbOIKLnVCV0d0y3wEVLNLW2lfDNVE+kbgaDyllFnSILB2jqgpuTYEcUus/phmGvtr0aa+4qT10z6hcju16KW/ioVdKYhdscp6JVfLR0saBNQ8PGmM8sytIYirsY/v2lohDd7WYgSiIKA6X7qxJpehiCtHvgJsn9wjKzQC6RBQ28yb06m7Q9OQxNV+orZCcvUWyoGndU4LAbXhqTbJYKWp2gcoNa53WpeYvR0CAYWXZsmOG/KJOwNKja/VANtiBMaGQAr+LIlZKsVKTH/S2GbN/kwegVT8uQvQXRQfCagrfFvRXuXObU/y8UagUASUibVGLtvaEndWZUElO5Q8r0igpiInFTG0W9MTfJwRKBiBGwDVFs8ibYm7MGle+YhHA+9sablCIhUaaTECNSOgXsTqHpFF2hL3ucB5iyxVaVPl47bpDHAicEIWj63UCMRB4DvAtnGGaj9KW+KeFvrvLKXpvaEuU9PKiAcAFwBKjbIYgdoQUJLILrmMbktckfPgOcZ+FjgbUIe8eaLcUWXLqO+NxQjUhIDWa/bLZXBb4l4SWgc2sVcf76oIIWIq/HE50RP3WOAYQJEoFiNQAwL/DByay9C2xNX3rBpatxU1Q7osEFhlXX4Ssl80jkIj1bBKokZcG7Yd3McbgQwIvD40jcugun1an5pKqbmUxQhMHQH1Wj49Fwhtn7haeNo6l7HWawQKQuA5wLtz2dOWuAq8eEguY63XCBSEwN6A1nyySFviuqZRlmmy0gIR0LpMtn7EbYmrrR51J7MYgakjkC2JXsC3Ja6KfR849Rmz/0agA3eigtaWuCp4rsLnFiMwZQTUgT5rr6y2xFWgRLYl8ClfKfa9KAT0yfjYnBa1Je4TgI/nNNi6jUABCCikV4k12aQtcVW7V1FPFiMwZQT05vnGnAC0Ja5sVQyy6slajMBUEdgfuDin812IK4OfmNNo6zYCmRFQ2O/3ctrQhbhHAWfkNNq6jUBmBFYFbstpQxfiqo2m2mlajMAUEbgG2Cq3412IK5tVtmOWipfbB+s3AikRUGO17EFIXYmrInFvTomWdRmBQhB4ZQkN7boSV5UqflMIkDbDCKREIPuKspztSlyd+y5AOYkWIzAlBDYGrsvtcB/ibgaotqzFCEwFATUbX7cEZ/sQV/afAxxegiO2wQgkQEDhvkXEMPQl7gaAMiXUbtBiBMaOQBELU32/cWeTpDQ/pftZjMDYEdgTuLQEJ/s+cWc+fBnYoQSHbIMRGBCBbB3oF/sUi7haafsuoG5+FiMwRgS+BWxXimOxiCt/9g1tNEvxzXYYgZgIKOBI3TaKkJjElUOvBV5ehGc2wgjEReBJwEfjDtl9tNjElSVn5a4O0B0On2kElkVgbeCmUvAZgrjy7UzgyFKctB1GoCcCRX3fypehiKux9cqsV2eLEagdgZOBV5XkxJDElZ+7AkqDKiJMrCTgbUtVCDwSUKfKYmRo4srR9UPn+T2K8dqGGIHmCBQTn7zQ5BTEnelTE2BVxnPz6uYXjY/Mj4A68hWXBZeSuJoCNa3WqvN++efDFhiBRggoqaC4WuKpiTtDavtQRcANxBpdOz4oEwK3AvfIpHtFtbmIOzNqF+DVwO4lgmObJo/Ae4BDSkQhN3FnmGwR8nqf5RXoEi+TydqkMN5PlOh9KcRdiM1BIe55N0D5vhYjkAOBW4A1cyhuorNE4i60W60MtRcsEu8MbNTEKR9jBCIgcC5wRIRxBhmidOIudlo9i3YMub9a4HoYcPdBkPGgU0dgJ0B55kVKbcRdCKIIrJhokddiBGIioCKIWncpVmojrkInDwAOBrQibTECQyBQTG2p5ZzLQdxtgFeE0q7XAj8F/rKMgSKqgjY2D9+6bnsyxGXqMRcjUETt5JWmJQdxtVJ3s68VI1AoAh8Jb3WFmne7WTmIK71fBZRxYTECpSGgXYwvlGbUYntyEfc44LTSwbF9k0PgKkCfcsVLLuK6x27xl8YkDXw2cH4NnucirrD5YgiqqAEn2zh+BIrMu10O9pzEPQxQdIrFCJSAwLEhX7wEW+bakJO4qwLXA2vNtdIHGIFhEVCv5/sBvxtWTbzRcxJXXiilr6giXPGg9UgVIXAScEJF9mbbDpphtE4IwHC8cU1Xzbhs/UNIXvl1TW7lfuIKK4WX6Y5nMQI5ENAbn8qvViUlEFe9dRXUvV5VyNnYMSBwI7AZ8PvanCmBuMJMxeOK6ctS2yTa3s4IPA84p/PZGU8shbiC4EJA1S8sRiAFAlcDW6dQNISOkoir5IMrXa5miGn2mEsgsBfwmVqRKYm4wnDbUHVAe7wWIzAUAh+rvbZ3acTVRKkA9cVDzZjHNQJh++dnNSNRInGF50uAU2sG1rYXi4A6SKqQQ9VSKnEF6hnAUVWja+NLQ0Dbjg8CbivNsLb2lExc+aKGSyqSbjECMRB4BPC1GAPlHqN04gqfC4Cn5wbK+qtH4A3Ai6v3IjhQA3Fl6vGhSdhYcLcfaREovtxqWzhqIa78UnSVgjSckNB2ln383wHfHhMMNRFXuD8YuAjYakyTYF8GRaCqBPmmSNRG3Jlf6mBwZFMnfdxkEbgM2GOM3tdKXM2FmmLr1Vn9hCxGYDECqiGlWGT9HZ3UTFxNhrqFK59Xr0MWI7AQgSrqI3edstqJO/Nb9YJOB57aFQifNyoEqkyObzMDYyHuzGd17jsR2KcNCD52VAhcCuw5Ko+WcGZsxJ25+ADgaOCZ3j4a+yV8J/9+HjoRqJv8qGWsxJ1Nmkq/Hgqo0oE6/lnGi4Aaye0ccrrH62XwbOzEXTiBegrvG36PGv3MTstBVWrcbSxxyE2mbkrEXYjHPYH9Q8/dHRzQ0eRSKfqYRwOXF21hZOOmStzFMIrIOwHbAzuGFqCrR8baww2DgAovfHyYocsd1cRdem5eP6ZMknIvv96WPQN4b+9RKhzAxL3rpGkrodoiYhVeg11N/kfgrK4n136eiXvnGdwF+DSgIu2WchHQXr36Tk1WTNw7pl6rkiLtKpO9GupwXBFyx9Vh6nBWmri3Y/sC4O3DweyRIyGguPTXRBqr6mGmTlzt7X4QeEjVszgN4xUJp3ROC2Rvs5lzEp4citF52yfnLDTTfThwXrNDp3HUFJ+42qt9HbD7NKa4ai/VRU832Euq9mIA46dEXNWs0uuWFqEs5SPw38DjphJ73HY6xk7c+wDPDokGm7QFx8dnQ+ArIaa8qi7xKdEaK3EVUSPC+nU45dUUR5eCKhRcYVkBgTERVxUglTjwfLfqrPaa1832/GqtT2h4zcRVfWUVjHtseK3yq3DCCyeyquvDTffrkccd7XC1EVcFwPT6qzQuhSda6kfgU8AhY63GONT0lEpcVW/cBrg/oCAJJb6ruoFlPAj8ETgGOHs8LqXzpATibgpsBqiTmoq96e9900FgTRkQUMe8gwD19LF0QCAFcbcIRBRBNw6/jQJZ/V3aYdIqP0VNpdVc2tIDgT7EVdWIDcMKruoaa89UPz0t1wdE1HV72OZTx4XAN8K37PfG5VYeb1Yirkj4ImANQPG8+qtvzxlZ3TUvz5zVqPVlwKk1Gl6qzfOeuNoXVVf4NUt1wHYVjcDnQjDF1UVbWaFx84grl9YJmRkiscUINEHgupDsrpRJywAINCHuTO2zgLeG1+YBTPGQI0BA9Y1PcbL78DPZhriyRqvCenV2DPDwc1OThtuAc8Nq8Y01GV6rrW2JO/NTkS5vAu5Vq+O2OxoCCqA4GVDfHksiBLoSV+ZphfmlwAtdYC3RbJWl5m1hpVhxxpbECPQh7szU9YCTAJUXsYwbAb0SK+1OBeNvGLerZXsXg7gzDxVwoYgYhbJZxoXAb0MVzDcAN43LtTq9iUncGQJKDlDB6qfUCYmtXoDAr4Azwm6CyGspBIEhiDtzTYkD+gY+rBBfbUZzBBT8r6erM3eaY5b0yCGJO3NE8coKnVTRcYVNWspF4DLgXcD7yzXRlgmBFMSdIa14Z3WG1yq04p0tZSDwTeB9oeud92DLmJO5VqQk7kJjjgCODMnyc430AdER+CHwAeAC4PvRR/eAgyOQi7gzx5Q4r1BKrUQ7mGPY6Vb88EWBsEqxs1SMQG7iLoTuwJCv+fiK8SzN9F8EsoqwXyrNONvTHYGSiDvzQnm+qmC/L7APcO/u7k3yTO2zfjg8WZVWZxkhAiUSdzHMOwQC7w1sN8I5iOGSvlkvBy4GPhljQI9RNgI1EHchgmsDe4Un8p6Awi2nKD8APr/g5wD/iV0FtRF38fQ8FNgJ0FNZP6UdjlFmT9QZWU3UMc5yC59qJ+5iV/U9LCLvCDw81GXeoAUeuQ/Vk/Qq4BpA5V709wrg1tyGWX9ZCIyNuEuhuyqwJaAysZuHvwrHVDVKkVrVKlOJYn/VPlI/pcNdG/ZRRdIrUxlhPfUjMAXizpulVUJZWZFYP0V1rQWsFvKM/yb81XGz318Bfwo/pbrN/lt/Z/++ZRFJXfx73kz4/zdGwMRtDJUPNALlIGDiljMXtsQINEbAxG0MlQ80AuUgYOKWMxe2xAg0RsDEbQyVDzQC5SBg4pYzF7bECDRG4P8A3SKu5/rwGYoAAAAASUVORK5CYII="
    };
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("main"));
      var maskImage = new Image();
      maskImage.src = this.img;
      const option = {
        // title: {
        //   text: "科研热点分析",
        //   x: "center",
        //   textStyle: {
        //     fontSize: 20,
        //   },
        // },
        tooltip: {
          show: true
        },
        series: [
          {
            name: "热点分析",
            type: "wordCloud",
            //size: ['9%', '99%'],
            sizeRange: [14, 40],
            //textRotation: [0, 45, 90, -45],
            rotationRange: [-50, 50],
            gridSize: 3,
            maskImage: maskImage,
            autoSize: {
              enable: true,
              minSize: 10
            },
            textStyle: {
              normal: {
                color: function() {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160)
                    ].join(",") +
                    ")"
                  );
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            width: "600",
            height: "400",
            data: this.cloudData
          }
        ]
      };
      this.chart.setOption(option);
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>

<style>
#main {
  width: 600px;
  height: 400px;
}
</style>
