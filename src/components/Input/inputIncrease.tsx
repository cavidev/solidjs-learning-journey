import { For, createSignal  } from "solid-js";
import { TextInput } from "./TextInput";

const InputIncrease = () => {
  const [comment, setComment] = createSignal(""); // Line1\nLine2\nLine3\nLine3
  const [comments, setComments] = createSignal([""]);

  let formRef!: HTMLFormElement;

  const updateComment = (value: string) => {
    setComment(value);
  }

  return (
    <div class="flex flex-col text-black items-center justify-center gap-3 m-64" >
      <form 
        ref={formRef}
        onSubmit={async (e) => {
          await setTimeout(()=> {
            setComments(comments())
          }, 10000)
          console.log("Fui Presionado!!")
       }}>
          <TextInput
            multiline={true}
            placeholder="Add a new comment..."
            transparent
            value={comment()}
            onInput={(e) => updateComment(e.target.value)}
          />
      </form>
      {comments().map((comment) => (<div>${comment}</div>))}
    </div>
  );
  
};

export default InputIncrease;