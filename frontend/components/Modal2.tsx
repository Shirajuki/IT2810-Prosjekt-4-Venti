interface IProps {
	modal: {id: string, product: Product},
	setModal: (id:string, product: Product) => void;
}

const Modal = observer(( props: IProps ) => {
	const product = useAsObservableSource(props.modal.product);
	const CTX = useContext(RootStoreContext);
	const messageRef = useRef(null);
	const nameRef = useRef(null);
	const [stars, setStars] = useState(Number);

	const post = async () => {
		/*if (await CTX.reviewStore.postReviews(props.modal.id, messageRef?.current?.value,  nameRef?.current?.value, stars)) {
			messageRef.current.value = "";
			nameRef.current.value = "";
			setStars(0);
			setTimeout(() => {
				document.getElementsByClassName("modalContent")[0].scrollTop = 999999;
			}, 500);
		}*/
	}

	useEffect(() => {
		if (!isNaN(Number(props.modal.id))) {
			CTX.reviewStore.getReviews(props.modal.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.modal.id]);
<View style={styles.modalContainer}/*{[${props.modal.id === "none" ? "hidden" : "shown"}]}*/>
			<View style={styles.modalContent}>
				<View style={styles.modalHeader}>
					<TouchableOpacity style={styles.closeButton} data-cy="close-button" /*onPress={() => props.setModal("none", null)}*/>
						<Text>&#10006;</Text>
					</TouchableOpacity>
				</View>
				<Items id={props.modal.product?.id} img={product?.image_link} name={product?.name} description={product?.description} rating={Number(product?.rating)} price={product?.price} onClick={() => void(0)} type="modal"/>
				<View /*style={"star"}*/>
					<StarRating data-cy="star-area" roundedCorner={true} isHalfRating={true}  handleOnClick={(rating:number) => {setStars(rating)}}/>
				</View>
				<View style={styles.reviews}>
					<View style={styles.reviewInput}>
						<textarea ref={nameRef} placeholder="Name" data-cy="name-area"></textarea>
						<textarea ref={messageRef} placeholder="Write your review here..." data-cy="review-area"></textarea>
						<TouchableOpacity style={styles.sendButton} onPress={() => post()} data-cy="send-area"><Text>Send</Text></TouchableOpacity>
					</View>
					{CTX.reviewStore.reviews.map((review: Review) => (
						<View style={styles.review} data-cy="view-reviews">
							<Text style={styles.reviewUser}>{review.name}</Text>
							<StarRating size={20} initialRating={review.stars} isReadOnly={true} isHalfRating={true}/>
							<Text style={styles.reviewComment}>{review.reviewText}</Text>
						</View>
				))}
				</View>
			</View>
		</View>

        