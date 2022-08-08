import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Container, Grid, InputAdornment, Pagination, SvgIcon, TextField, Button, Link } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import NewsCard from '../news/news-card';
import { findAllWithWord } from '../../utils/searchInStrings';

const NEWS_PER_PAGE = 6;

/**
 * Muestra todas as noticias registradas en la base de datos mediante
 * paginación.
 * @param {{isEmployee: boolean}} props 
 * @returns 
 */
export default function ShowNews(props) {
  const [page, setPage] = useState(1); // We display 6 news per page.
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(0);
  const [dataNews, setDataNews] = useState();
  const [searchedNews, setSearchedNews] = useState();
  const router = useRouter();


  useEffect(() => {
    /**
     * Obtiene las noticias de la BD.
     */
    const getNews = async () => {
      const request = await axios.get("http://abc-app-univalle.herokuapp.com/News/");
      const dataN = request.data;
      const dataNfilter = dataN.filter((value) => {
        var date = new Date;
        var valueDate = new Date(value.Finish_date)
        var dateValues = valueDate.getFullYear() + '-' + parseInt(valueDate.getMonth() + 1) + "-" + parseInt(valueDate.getDate() + 1)
        var finishDateFinal = new Date(dateValues)
        return (value.State == 'Activo' && !(date.getTime() >= finishDateFinal.getTime()))
      }
      )
      setDataNews(dataNfilter);
      setSearchedNews(dataNfilter);
      setNumPages(Math.ceil(dataNfilter.length / NEWS_PER_PAGE));
      setLoading(false);

    }
    getNews();
  }, [])

  /**
   * WIP
   * 
   * Debería acceder directamente a la ventana donde muestra
   * la noticia.
   * @param {event} e 
   */
  const testClick = (e) => {
    const newSelected = e.target.id;
    localStorage.setItem('noticia', JSON.stringify(searchedNews[newSelected]));
    router.push("Noticias/[id]/Ver", `Noticias/${searchedNews[newSelected].Title}/Ver`);
  }

  /**
   * Obtiene los elementos que debería desplegar según la página
   * que ahaya seleccionado.
   * @returns Array de Cards que contengas la información pertinente
   *          a cada noticia.
   */
  const displayPageElements = () => {
    let elements = [];

    // Ordena las noticias por mas reciente en fecha de creación.
    searchedNews.sort(function (a, b) {
      return new Date(b["Edition_date"]) - new Date(a["Edition_date"]);
    })

    for (var i = (page - 1) * NEWS_PER_PAGE; i < Math.min(page * NEWS_PER_PAGE, searchedNews.length); i++) {
      elements.push(
        <Grid key={i} item lg={4} md={6} xs={12} name={i}>
          <NewsCard id={i} new={searchedNews[i]} onClick={testClick} />
        </Grid>
      );
    }

    return elements;
  }
  /**
   * Cambia el valor de 'page' a la página seleccionada.
   * @param {useless} _ 
   * @param {int} value 
   */
  const handlePageChange = (_, value) => {
    setPage(value);
  }

  const handleSearchNews = (e) => {
    const searchedValue = e.target.value;
    const dataN = findAllWithWord(searchedValue, dataNews, "Title");
    setSearchedNews(dataN);
    setNumPages(Math.ceil(dataN.length / NEWS_PER_PAGE));
  }

  if (loading) {
    return (
      <Box sx={{ maxWidth: 500 }}>
        <TextField
          inputProps={{ min: 0, style: { textAlign: 'center' } }}
          label="Cargando Noticias..."
          name="title"
        />
      </Box>
    )
  } else return (
    <Box component="main" sx={{ flexGrow: 1, py: 4 }} >
      <Container maxWidth={false}>
        <Box sx={{ width: 'auto', margin: 'auto', marginTop: '40px' }}>

          <Box sx={{ m: 1, gap: '12px', display: 'flex', alignContent: 'left' }}>

            <Link href="/admin/noticias/crearNoticia">
              <Button color="success" variant="contained">Registrar Noticia</Button>
            </Link>

          </Box>

        </Box>

        <Box sx={{ pt: 3 }}>
          <Grid container spacing={8}>
            {displayPageElements()}
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
          <Pagination page={page} color="primary" count={numPages} size="small"
            onChange={handlePageChange} />
        </Box>
      </Container>
    </Box>
  )
}