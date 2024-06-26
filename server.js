import app from './app';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log();
  console.log(`Escutando na porta ${port}`);
  console.log(`Acesse http://localhost:${port}`);
});
