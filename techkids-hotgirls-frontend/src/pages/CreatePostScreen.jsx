import React from 'react';

class CreatePostScreen extends React.Component {
    state = {
        imageFile: undefined,
        imageSrc: '',
        content: '',
        errorMessage: '',
    }

    handleImageChange = (event) => {
        // validate image : File type(png,jpg,jpeg) , file size (2-5M)
        const imageFile = event.target.files[0];
        if (imageFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.onloadend = (data) => {
                console.log('data:', data);
                this.setState({
                    imageFile: imageFile,
                    imageSrc: data.currentTarget.result,
                });
            };
        }
    }
    handleContentChange = (event) => {
        this.setState({
            content: event.target.value,
        });
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        if (!this.state.imageFile || !this.state.content) {
            this.setState({
                errorMessage: 'Please select image and input content'
            })
        } else {
            // Upload Image
            const formData = new FormData();
            formData.append('image', this.state.imageFile);
            fetch(`http://localhost:3001/uploads/image`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    this.setState({
                        imageSrc: data.imageUrl,
                    })
                })
                .catch((error) => {
                    this.setState({
                        errorMessage: error.message,
                    });
                });
        }
        // create-post
       
      
    }

    
    render() {
       
        return (
            <div className='row mt-5'>
                <div className='col-2'></div>
                <div className='col-8'>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <input
                                type="file"
                                className="form-control"
                                style={{ color: 'transparent', }}
                                accept="image/*"
                                onChange={this.handleImageChange}
                            />
                            {this.state.imageSrc ? (
                                <div style={{ textAlign: 'center' }}>
                                    <img src={this.state.imageSrc} alt="Preview"
                                        style={{
                                            marginTop: `5px`,
                                            height: `300px`,
                                            with: `auto`,
                                        }} />
                                </div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder="Please input content..."
                                value={this.state.content}
                                onChange={this.handleContentChange}
                            >
                            </textarea>
                        </div>
                        {this.state.errorMessage ? (
                            <div class="alert alert-danger" role="alert">
                                {this.state.errorMessage}
                            </div>
                        ) : null}
                        <div className="form-group">
                            <input type="submit" className="btn btn-primary" value="Create Post" />
                        </div>
                    </form>
                </div>
                <div className='col-2'></div>
            </div>
        );
    }
}
export default CreatePostScreen;