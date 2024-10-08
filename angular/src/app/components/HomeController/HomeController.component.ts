/* Converted from src/sections/home/home.css */

.home-frame {
  position: absolute;
  left: 0;
  right: 0;
}
.home-banner {
  background: url('../../assets/images/shattered.png');
}
.home-banner .inner {
  padding: 60px 0 0 0;
}
.home-banner .inner img {
  float: left;
  margin-top: -45px;
}
.home-banner .inner h1 {
  line-height: 60px;
  font-size: 40px;
}
.home-banner .inner h1 span {
  color: #3bb9bb;
}
.home-banner .inner h2 {
  font-size: 24px;
  line-height: 30px;
  color: #666;
}
.home-banner .inner p {
  font-size: 16px;
  line-height: 25px;
  margin-top: 30px;
}
.tutorials-title {
  font-size: 30px;
  line-height: 50px;
  font-weight: 300;
  background-color: #333;
  color: #FFF;
}
.tutorials {
  margin: 20px 0;
  padding: 0;
  list-style: none;
}
.tutorials li {
  position: relative;
  background-color: #FFF;
  padding: 20px 150px 20px 20px;
  margin-bottom: 20px;
}
.tutorials li.offline {
  background-color: #999999;
  color: #666666;
}
.tutorials li .btn {
  position: absolute;
  right: 40px;
  top: 40px;
}
.tutorials li p {
  margin: 10px 0 0 0;
  font-size: 16px;
  line-height: 20px;
  color: #666;
}
.tutorials li .number {
  width: 80px;
  height: 80px;
  float: left;
  background-color: #333;
  margin: 0 20px 0 0;
  text-align: center;
  line-height: 80px;
  font-size: 40px;
  color: #CCC;
}
.tutorials li.offline .number {
  background-color: #919191;
  color: #666;
}
.share-buttons {
  float: right;
  width: 330px;
  height: 50px;
  margin-top: -10px;
}
.home-buttons {
  text-align: center;
  padding: 20px 0 40px 0;
}
.no-data.tuts {
  line-height: 50px;
  margin-bottom: 30px;
}
@media(max-width:992px) {
  .home-banner .inner {
    width: 100%;
    padding: 20px;
  }
}
