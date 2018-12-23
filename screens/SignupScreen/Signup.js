import React from "react";
import { StyleSheet, View, FlatList, KeyboardAvoidingView, Animated, Easing } from "react-native";
import { QED_Group } from "../../constants/Colors";
import {MonoText} from '../../components/StyledText'
import windowSize from '../../constants/Layout';
import {TextInputMono} from '../../components/StyledTextInput';
import { ButtonMono } from '../../components/StyledButton';
import Level from '../../models/Level';
import {createAnimation, createInterpolate, createSpringAnim} from '../../components/Animation';
import Toast from 'react-native-simple-toast';
import { validateByLength, isNumbers, validateEmail } from '../../utils/stringUtils'
const NAME = 'name';
const PHONE = 'phone';
const EMAIL = 'email';
const PASSWORD = 'password';
const colors = Object.values(QED_Group);

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            password: '',
            currentLevel: null,
            levels: null,
        }
        this.COLOR_N = 1
        this.yQuestionAnim = new Animated.Value(-windowSize.window.height * .5);
        this.xLevelsAnim = new Animated.Value(-windowSize.window.width * .5);
        this.spinAnim = new Animated.Value(0);
        this.springAnim = new Animated.Value(0.9);
        this.spinQuestion = createInterpolate(this.spinAnim, [0, 0.01, 1], ['0deg', '270deg', '360deg']);
    }
    
    componentDidMount() {
        this.questionAnimationComeFromUp();
        createAnimation(this.xLevelsAnim, 0, 1000, Easing.linear, 0, false).start();
        const levels = this.makeLevelsArray()
        const currentLevel = levels[0];
        this.setState({ levels, currentLevel })
    }

    makeLevelsArray = () => {
        const levels = [] 
        levels.push(new Level(1, true, NAME, 'default', 'Your Name?', 17, 'Perfect!'));
        levels.push(new Level(2, false, PHONE, 'phone-pad', 'Phone Number?', 12, 'The Phone Number Is Good!'));
        levels.push(new Level(3, false, EMAIL, 'email-address', 'Email?', 28, 'Great!'));
        levels.push(new Level(4, false, PASSWORD, 'default', 'Password...', 8, 'Complete!!'));
        return levels;
    }

    getColor = (i) => { return colors[(this.COLOR_N + (i)) % 4]; }

    onNextClick = () => {
        const { currentLevel, levels } = this.state;
        currentLevel.result = this.state[currentLevel.attribute];
        if(this.validateInput(currentLevel.attribute, currentLevel.result)){
            if (currentLevel.number < levels.length) {
                this.questionAnimationFallDown().start()
                setTimeout(() => {
                    this.titleSpringAnimation(currentLevel.number);
                    const nextLevel = levels[currentLevel.number];
                    nextLevel.status = true;
                    this.COLOR_N = nextLevel.number;
                    this.setState({ currentLevel: nextLevel });
                    this.questionAnimationComeFromUp();
            }, 400);
            } else {
            const { name, phone, email, password } = this.state;
            const userDetails = { name, phone, email, password };
            this.titleSpringAnimation(100);
            this.props.navigation.navigate("ImagePicker", { userDetails });
            this.titleSpringAnimation(currentLevel.number, 100);
            }
        }
        else{
            this.showInvalidInputMessage(currentLevel.attribute)
        }
    }

    validateInput = (attribute, value) => {
        let validation = true;
        switch (attribute) {
            case NAME:
                validation = validateByLength(value, 2)
                break;
            case PHONE:
                validation = validateByLength(value, 2) && isNumbers(value)
                break;
            case EMAIL:
                validation = validateEmail(value)
                break;
            case PASSWORD:
                validation = validateByLength(value, 6)
                break;
            default:
                break;
        }
        return validation
    }

    showInvalidInputMessage = (inputType) => {
        let msg = ''
        switch (inputType) {
            case NAME:
                msg = 'Your name is too short (at least 2 characters)';
                break;
            case PHONE:
                msg = 'An invalid phone number was entered';
                break;
            case EMAIL:
                msg = 'The email address you supplied is invalid';
                break;
            case PASSWORD:
                msg = 'Your password is too short (at least 6 characters)';
                break;
            default:
                break;
        }
        Toast.show(msg, Toast.SHORT,Toast.BOTTOM)
    }

    onBackClick = () =>{
        const { currentLevel, levels } = this.state;
        this.questionAnimationFallDown().start()
        setTimeout(() => {
            this.titleSpringAnimation(currentLevel.number-1);
            const prevLevel = levels[currentLevel.number-2];
            currentLevel.status = false;
            this.COLOR_N = prevLevel.number;
            this.setState({ currentLevel: prevLevel });
            this.questionAnimationComeFromUp();
        }, 400);

    }

    questionAnimationFallDown = () =>{
        return Animated.parallel([
            createAnimation(this.yQuestionAnim, windowSize.window.height * .57, 370, Easing.ease, 0, false),
            createAnimation(this.spinAnim, 1, 380, Easing.ease, 0, false),
            ])
    }

    questionAnimationComeFromUp = () => {
        this.yQuestionAnim.setValue(-windowSize.window.height * .5)
        this.spinAnim.setValue(0)
        Animated.parallel([
            createAnimation(this.yQuestionAnim, 0, 800, Easing.bounce, 0, false),
            createAnimation(this.spinAnim, 1, 700, Easing.ease, 0, false),
        ]).start(() => {
            this.yQuestionAnim.setValue(0);
            this.spinAnim.setValue(0);
        })
    }

    titleSpringAnimation = (i, delay = 0) => {
        createSpringAnim(this.springAnim, 0.9 + (i * 5 / 100), 1000, Easing.ease, delay).start();
    }



    render() {
        const {levels, currentLevel} = this.state;
        return (
        <KeyboardAvoidingView style={[styles.container,{backgroundColor: this.getColor(1)}]} behavior="padding">
            <Animated.View style={[styles.headerContainer,{transform: [{ scale: this.springAnim}] }]}>
                <MonoText style={[styles.title,{
                    color: this.getColor(4),
                    borderLeftColor: this.getColor(3)}]}>Sign Up!</MonoText>
                <MonoText style={[styles.subtitle,{
                    color: this.getColor(2),
                    borderLeftColor: this.getColor(3),
                }]}>We Make It Easy.</MonoText>
            </Animated.View>
            {levels ? 
            <React.Fragment>
                <View style={styles.fieldContainer}>
                    <View style={styles.inputContainer}>
                        <Animated.View style={{top: this.yQuestionAnim, transform: [{rotate: this.spinQuestion}]}}>
                            <MonoText style={[styles.label,{color:this.getColor(3)}]}>{currentLevel.label}</MonoText>
                        </Animated.View>
                        <TextInputMono
                        value={this.state[currentLevel.attribute]}
                        onChangeText={(input) => this.setState({[currentLevel.attribute]: input})}
                        style={[styles.input,{
                            borderBottomColor: this.getColor(3),
                            color: this.getColor(4)},
                            currentLevel.attribute === EMAIL && {fontSize: 15}
                            ]}
                        maxLength={currentLevel.maxLength}
                        keyboardType={currentLevel.type}
                        secureTextEntry={currentLevel.attribute === PASSWORD}
                        onFocus={()=>console.log('focus')}
                        onEndEditing={()=>console.log('end')}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <ButtonMono 
                        _backgroundColor={this.state[currentLevel.attribute] ? this.getColor(3) : '#aaa'} 
                        _color={this.getColor(1)}
                        _fontSize={18} 
                        _text={currentLevel.number !== levels.length ? 'Next' : 'Done'}
                        onClick={this.onNextClick}
                        disabled={!this.state[currentLevel.attribute]}
                        />
                    </View>
                </View>
                <Animated.View style={[styles.levelsContainer,{left: this.xLevelsAnim}]}>
                    {currentLevel.number !== 1 && 
                    <ButtonMono 
                    _backgroundColor={this.getColor(3)} 
                    _color={this.getColor(1)}
                    _fontSize={26} 
                    _text={'⇦'}
                    _padding={5}
                    onClick={this.onBackClick}
                    style={{marginLeft: 15}}
                    />
                    }
                    <FlatList
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                    data={levels}
                    horizontal
                    renderItem={({item,index}) => 
                    <MonoText style={[
                        styles.level,
                        item.status && {backgroundColor: '#EAEB5E'}
                    ]}>{item.number}</MonoText>
                    }
                    keyExtractor={(item) => item.number.toString()}
                    refreshing={true}
                    />
                </Animated.View>
            </React.Fragment>
            :
            <MonoText>Loading...</MonoText>
            }
        </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: windowSize.window.width * .1,
        paddingVertical: windowSize.window.height * .05,
    },
    title: {
        fontSize: 48,
        fontWeight: "500",
        paddingHorizontal: 15,
        borderLeftWidth: 5,
    },
    subtitle: {
        fontSize: 20,
        paddingHorizontal: 15,
        borderLeftWidth: 5,
    },
    fieldContainer: {
        flexDirection: 'row',
        paddingTop: windowSize.window.height * .1,
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        paddingBottom: 22,
        fontSize: 22,
    },
    input: {
        borderBottomWidth: 2,
        width: windowSize.window.width * .6,
        height: 45,
        fontSize: 26,
        paddingHorizontal: 15,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },
    levelsContainer: {
        flex: 0.5,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 15,
    },
    level: {
        fontSize: 14,
        paddingVertical: 4,
        paddingHorizontal: 9,
        marginHorizontal: 3,
        borderRadius: 50,
        backgroundColor: '#e62739',
    },
});
