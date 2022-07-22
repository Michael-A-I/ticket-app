import React, { useState } from "react"

/* display a thumb picture of uploaded pic */
function Thumb(props) {
  const [loading, setLoading] = useState(true)
  const [thumb, setThumb] = useState("")

  const fileSetup = () => {
    if (!props.file) {
      return
    }
    console.log("fileSetup:" + props.file)
    //! setLoading(true) - ERROR too many react re renders
    let reader = new FileReader()

    reader.onloadend = () => {
      setLoading(false)
      setThumb(reader.result)
    }
    reader.readAsDataURL(props.file)
  }

  fileSetup()

  /* views */
  while (!props.file) {
    return null
  }

  if (loading) {
    return <p>loading...</p>
  }

  return <img src={thumb} className="img-thumbnail mt-2" height={200} width={200} />
}

export default Thumb

// class Thumb extends React.Component {
//   state = {
//     loading: false,
//     thumb: undefined,
//   };

//   componentWillReceiveProps(nextProps) {
//     if (!nextProps.file) { return; }

//     this.setState({ loading: true }, () => {
//       let reader = new FileReader();

//       reader.onloadend = () => {
//         this.setState({ loading: false, thumb: reader.result });
//       };

//       reader.readAsDataURL(nextProps.file);
//     });
//   }

//   render() {
//     const { file } = this.props;
//     const { loading, thumb } = this.state;

//     if (!file) { return null; }

//     if (loading) { return <p>loading...</p>; }

//     return (<img src={thumb}
//       alt={file.name}
//       className="img-thumbnail mt-2"
//       height={200}
//       width={200} />);
//   }
// }
