import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Audiotrack';
import ListItemCustom from './ListItemCustom';
import WordAudio from './WordAudio';


const styleSheet = createStyleSheet('CheckboxList', theme => ({
    root: {
        width: '100%',
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
        background: theme.palette.background.paper,
    },
}));

let wordList = {
    fresh: '新鲜的',
    aquifer: '含水层',
    comb: '梳子,梳理',
    pristine: '原始的',
    groundwater: '地下水',
    recede: '退去',
    sculpture: '雕像',
    carve: '刻',
    bath: '洗澡',
    negotiate: '协商',
    construct: '建造',
    niche: '合适的职业',
    irrigation: '灌溉',
    vast: '巨大的',
    majority: '大多数',
    monument: '纪念碑',
    invention: '发明',
    crater: '陨石坑',
    disuse: '废弃',
    structure: '结构',
    utilitarian: '实用的',
    slop: '溅出',
    derelict: '荒废的',
    earthquake: '地震',
    unique: '唯一的',
    tier: '排层',
    divert: '改变',
    scale: '规模,刻度',
    architecturally: '建筑学的',
    elaborate: '精密的',
    industrial: '工业的',
    honour: '荣誉的',
    complex: '复杂的',
    via: '通过',
    condition: '条件',
    resemble: '相似的',
    widely: '宽泛地',
    storey: '楼层',
    suffer: '遭受',
    tank: '水槽',
    gather: '收集',
    pillar: '柱子',
    undergo: '经历',
    hallmark: '标志,特点',
    leisure: '闲暇的',
    pavilion: '阁楼',
    restoration: '修复(n)',
    display: '展览',
    relaxation: '放松',
    shelter: '庇护所',
    announce: '宣布',
    stunning: '令人震惊的',
    worship: '敬神',
    relentless: '持续的',
    restore: '修复(v)',
    geometrical: '几何的',
    villager: '村民',
    impressive: '印象深刻的',
    throughout: '贯穿',
    formation: '构造',
    dot: '点,散布于',
    intricate: '复杂的',
    state: '州,国家',
    terrace: '梯田,阳台',
    survive: '生存',
    decorative: '装饰的',
    ancient: '古老的',
    intricately: '复杂地',
    community: '社会',
    feature: '特征',
    fine: '罚款',
    shrine: '圣地神殿',
    position: '位置',
    embellish: '装饰',
    current: '当前的,流',
    wealth: '财富',
    comprise: '包括',
    churn: '流失',
    silted: '被淤塞的',
    region: '地区',
    descend: '下降',
    butter: '黄油',
    archaeological: '考古学的',
    commission: '委员会',
    aesthetically: '审美地',
    ornate: '华丽的',
    survey: '调查',
    ingenuity: '独创性(n)',
    dramatic: '戏剧的',
    overlook: '忽略,俯瞰',
    preserve: '保护',
    artistry: '艺术家气派的',
    steeply: '陡峭地',
    colonnaded: '有柱廊的',
    gaze: '凝视',
    existence: '存在',
    striking: '显著的',
    neglect: '忽视',
    reminder: '提示',
    civilisation: '文明',
};
// wordList = {
//     fresh: '新鲜的',
// };
class CheckboxList extends Component {
    constructor(props) {
        super(props);
        this.speak = this.speak.bind(this);
        this.state = {
            audio: '',
        };
    }
    state = {
        checked: [0],
    };

    speak(key) {
        console.log(key);
        this.setState({
            audio: `http://dict.youdao.com/dictvoice?audio=${key}`,
        });
    }
    render() {
        const classes = this.props.classes;
        const allListItem = [];
        for (const [enWord, value] of Object.entries(wordList)) {
            allListItem.push(
                <ListItemCustom
                    enWord={enWord}
                    value={value}
                    hasChinese={this.props.hasChinese}
                    hasPhonetic={this.props.hasPhonetic}
                    hasSpeaker={this.props.hasSpeaker}
                    speak={this.speak}
                />,
            );
        }
        return (
            <div className={classes.root}>
                <List>
                    {allListItem}
                </List>
                <WordAudio
                    audioSrc={this.state.audio}
                />
            </div>
        );
    }
}

CheckboxList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(CheckboxList);
