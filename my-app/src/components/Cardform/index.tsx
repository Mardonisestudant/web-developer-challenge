import Image from 'next/image';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { BiTrashAlt } from 'react-icons/bi'
import styles from './styles.module.scss';
import photo from '../../../public/photo-upload@3x.png';
import icondeletePost from '../../../public/image.png';
import { AuthContext } from '../../Context/AuthContext';
const PHOTO = photo.src.toString()


export default function Cardform() {
    const {
        handlesave,
        datadefault,
        setDatadefault,
    } = useContext(AuthContext)

    const [avatarUrl, setavatarUrl] = useState<string>(PHOTO)
    const [nome, setNome] = useState<string>("");
    const [menssage, setMenssage] = useState<string>("");


    useEffect(() => {
        if (nome !== "" && menssage !== "" && PHOTO !== avatarUrl ) {
            setDatadefault({...datadefault ,
                btcolor: "#fff",
                disabled: false,
                iconupload: true,
                secondary: "success"
            })
        }

        if (nome === "" || menssage === "") {
            setDatadefault({...datadefault,
                secondary:"secondary",
                disabled:true,
                btcolor:"#313131"
            })
        }

        console.log(datadefault);
        
    }, [nome, menssage, avatarUrl])

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if (!e.target.files) {
            return;
        }

        const image: any = e.target.files[0];
        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setDatadefault({
                iconupload: true,
                icontrash: "visible",
                secondary: "secondary"
            })
            let imageurl = URL.createObjectURL(e.target.files[0])
            setavatarUrl(imageurl)
        } else {
            notifcationToast()
        }

    }

    const save = async () => {
        const data: any = {
            nome: nome,
            menssage: menssage,
            urlimg: avatarUrl
        }
        handlesave(data)
        setNome("")
        setMenssage("")
        setavatarUrl(PHOTO)

        setDatadefault({
            iconupload: false,
            icontrash: "hidden"
        })
    }

    function reset() {
        setDatadefault({...datadefault, 
            btcolor: "#313131",
            disabled: true,
            icontrash: "hidden",
            iconupload: false,
            secondary: "secondary"
        }
        )
        setNome("")
        setMenssage("")
        setavatarUrl(PHOTO)
    }

    function removeImg() {
        setavatarUrl(PHOTO)
        setDatadefault({
            iconupload: false,
            icontrash: "hidden",
            secondary: "secondary"
        })

    }


    const notifcationToast = async () => {
        return toast.error('Imagens png/jpeg', {
            theme: "colored",
            position: 'top-center'
        })
    }


    return (
        <Row>
            <Col className={styles.containerUpload} xs={12} sm={12} md={12} lg={12}>
                <Form.Label>
                    <Image
                        src={icondeletePost}
                        hidden={datadefault.iconupload}
                        className={styles.icon}
                        alt="icon" />

                    <Form.Control type="file"
                        onChange={handleFile} />

                    <Image
                        src={avatarUrl}
                        alt="logo"
                        height={88}
                        width={88} />

                </Form.Label>
                <BiTrashAlt
                    color='#FF5858'
                    size={25}
                    onClick={removeImg}
                    visibility={datadefault.icontrash}
                    className={styles.iconTrash} />
            </Col>
            <Col className={styles.containerForm} xs={12} sm={12} md={12} lg={12}>

                <Form.Control
                    type="text"
                    value={nome}
                    placeholder='Digite seu nome'
                    onChange={(e) => setNome(e.target.value)}
                />

                <Form.Control
                    as="textarea"
                    placeholder="Menssagem"
                    value={menssage}
                    onChange={(e) => setMenssage(e.target.value)}
                    style={{ maxHeight: 80 }} />
            </Col>

            <Col className={styles.containerbutton} xs={12} sm={12} md={12} lg={12}>
                <a href='#' onClick={reset}>Descartar</a>
                <Button
                    variant={datadefault.secondary}
                    disabled={datadefault.disabled}
                    style={{ color: datadefault.btcolor }}
                    onClick={save}
                >Publicar</Button>
            </Col>

            <Col className={styles.feed} xs={12} sm={12} md={12} lg={12}>
                <p>Feed</p>
            </Col>

            <ToastContainer />
        </Row>



    )
}