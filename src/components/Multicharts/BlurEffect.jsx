export default function setBlurEffect({state}) {
    const [blurState, setBlurState] = useState(false);
    if (state == true || state == false) {
        blurState = state;
    }
    return blurState;
}
