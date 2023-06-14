import React from 'react';
import {
  Icon,
  Row,
  Col,
  Button,
  message,
  Upload,
  notification
} from 'antd';
import globalConfig from 'config.js';
import moment from 'moment';  // antd@2.0之后, 日期相关的都变成moment对象了, 以前是Date对象
import FormSchemaUtils from './InnerFormSchemaUtils';
import Utils from '../../utils';
import Logger from '../../utils/Logger';

// 这个组件的实现还是有点技巧的, 因为对于不同的schema要显示不同的表单项, 不同表的schema肯定是不同的
// 我最开始是将InnerForm做成一个大的组件, 但这意味着必须要在render方法里解析schema, 虽然能实现功能, 但不完美, 效率也会比较差
// 而且antd的form是controlled components, 每输入一个字符都要重新render一次, 意味着每输入一个字符都要重新解析一次schema, 很蛋疼
// 这种实现见我以前的代码

// 在表名不变的情况下, schema也是固定的, 能不能只解析一次, 之后每次复用呢?
// 绞尽脑汁想到一个办法, 将每个表的表单都做成一个单独的组件, 这个组件是根据schema动态生成的, 在InnerForm的render方法中, 根据当前表名选择对应的组件去渲染
// 这样对InnerForm而言, 每个表单都是黑盒了, 不用关心里面的状态了
// 但要生成antd的表单必须配合一个getFieldDecorator函数, 很难搞, 不能简单的做到模版/数据的分离
// 我甚至考虑过是不是在编译期去解决, 根据schema动态生成js文件之类的, 但这样太麻烦, 最好是能在运行时搞定, 也考虑过eval方法之类的
// 后来参考了函数式语言的惰性求值, 终于想到一个解决办法, 解析schema后不返回具体的元素, 而是返回一个回调函数, 这个函数的参数是getFieldDecorator
// 在真正render的时候, 将getFieldDecorator作为参数传进去

// 此外, 还有一些问题, 比如如何动态生成组件, 如何获取表单的值之类的, 最后也都一一找到办法, 真是不容易...
// 应用的一些技巧: 高阶函数/高阶组件/ref/闭包

// 但表单项一多还是会有点卡...

const logger = Logger.getLogger('InnerForm');

/**
 * 内部表单组件
 */
class InnerForm extends React.PureComponent {

  // 什么情况会导致InnerForm re-render?
  // 1. 这个组件没有状态
  // 2. 只有props会导致re-render, 但由于这个组件是pure的, 所以只有表名变化时才会re-render




  /**
   * 表单的查询条件不能直接传给后端, 要处理一下
   *
   * @param oldObj
   * @returns {{}}
   */
  filterQueryObj(oldObj) {
    // 将提交的值中undefined/null去掉
    const newObj = {};
    for (const key in oldObj) {
      if (oldObj[key] !== undefined && oldObj[key] !== null) {
        // 对于js的日期类型, 要转换成字符串再传给后端
        if (oldObj[key] instanceof Date) {
          newObj[key] = oldObj[key].format('yyyy-MM-dd HH:mm:ss');
        } else if (moment.isMoment(oldObj[key])) {  // 处理moment对象
          newObj[key] = oldObj[key].format('YYYY-MM-DD HH:mm:ss');
        } else {
          newObj[key] = oldObj[key];
        }
      }
    }
    logger.debug('old queryObj: %o, new queryObj %o', oldObj, newObj);
    return newObj;
  }

  /**
   * 处理表单提交
   *
   * @param e
   */
  handleSubmit = (e) => {
    e.preventDefault();
    // 这种用法是非官方的, 直接从代码里扒出来的...
    // this.formComponent是通过ref方式获取到的一个react组件
    const oldObj = this.formComponent.getFieldsValue();
    const newObj = this.filterQueryObj(oldObj);
    console.log(newObj);
    // 还是要交给上层组件处理, 因为要触发table组件的状态变化...
    this.props.parentHandleSubmit(newObj);
  };

  /**
   * 清空表单的值
   *
   * @param e
   */
  handleReset = (e) => {
    e.preventDefault();
    this.formComponent.resetFields();
  };




  render() {
    const {tableName, schema, tableConfig} = this.props;

    // 根据当前的tableName, 获取对应的表单组件
    const FormComponent = FormSchemaUtils.getForm(tableName, schema, this.handleSubmit, this.handleReset);
    // 表单的前面是一堆输入框, 最后一行是按钮
    return (
      <div className="ant-advanced-search-form">
        {/*这个渲染组件的方法很有意思, 另外注意这里的ref*/}
        <FormComponent ref={(input, editor) => {  this.formComponent = input;  }} />
      </div>
    );
  }

}

export default InnerForm;
