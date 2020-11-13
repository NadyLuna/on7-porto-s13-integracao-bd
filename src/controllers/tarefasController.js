const tarefas = require("../models/tarefas");

const getAll = (req, res) => {
  console.log(req.url);
  tarefas.find(function (err, tarefas) {
    if (err) res.status(500).send({
      message: err.message
    });

    res.status(200).send(tarefas);
  });
};

const getById = (req, res) => {
  const id = req.params.id;
  //Find sempre retorna uma lista
  //FindOne retorna um unico documento
  //Poderia usar o findOn no lugar do find, já que teoricamente só deve existir um ID
  tarefas.find({
    id
  }, function (err, tarefas) {
    res.status(200).send(tarefas);
  });
};

const postTarefa = (req, res) => {
  console.log(req.body);
  let tarefa = new tarefas(req.body);
  tarefa.save(function (err) {
    if (err) {
      res.status(500).send({
        message: err.message
      });
    }
    res.status(201).send(tarefa.toJSON());
  });
};

const deleteTarefa = (req, res) => {
  const id = req.params.id;
  //deleteMany remove mais de um registro
  //deleteOne remove apenas um registro
  tarefas.find({
    id
  }, function (err, tarefa) {
    if (tarefa.length > 0) {
      tarefas.deleteMany({
        id
      }, function (err) {
        if (err) {
          res.status(500).send({
            message: err.message,
            status: "FAIL",
          });
        }
        res.status(200).send({
          message: "Tarefa removida com sucesso",
          status: "SUCCESS",
        });
      });
    } else {
      res.status(200).send({
        message: "Não há tafera para ser removida",
        status: "EMPTY",
      });
    }
  });
};
//pode usar com try e catch
// try{
//   tarefas.find({ id }, function(err, tarefas){
//     if(tarefas.length > 0){
//       tarefas.deleteMany({ id }, function(err){
//         res.status(200).send({
//           message: 'Tarefa removida com sucesso',
//           status: "SUCCESS"
//         })
//       })
//     }else{
//       res.status(200).send({
//         message: 'Não há tafera para ser removida',
//         status: "EMPTY"
//       })
//     }
//   })}
//   catch(err){
//     res.status(500).send({
//       message: err.message,
//       status: "FAIL"
//     })
//   }

const deleteTarefaConcluida = (req, res) => {
  //deleta quando concluído
  tarefas.find({
    concluido: true
  }, function (err, tarefa) {
    if (tarefa.length > 0) {
      tarefas.deleteMany({
        concluido: true
      }, function (err) {
        if (err) {
          res.status(500).send({
            message: err.message,
            status: "FAIL",
          });
        }
        res.status(200).send({
          message: "Tarefa removida com sucesso",
          status: "SUCCESS",
        });
      });
    } else {
      res.status(200).send({
        message: "Não há tafera para ser removida",
        status: "EMPTY",
      });
    }
  });
};

const putTarefa = (req, res) => {
  const id = req.params.id;
  tarefas.update({id}, { $set : req.body}, function (err){
  if (err) {
    res.status(500).send({message: err.message})
  }
  res.status(200).send({ message: "Registro alterado com sucesso"})
  })

};
// para alterar vários registros
// const putTarefa = (req, res) => {
//   const id = req.params.id;

//   //faz o update apenas para quem respeitar o id passado no parametro
//   // set são os valores que serão atualizados
//   tarefas.updateMany({ id }, { $set : req.body }, function (err) {
//     if (err) {
//       res.status(500).send({ message: err.message })
//     }
//     res.status(200).send({ message: "Registro alterado com sucesso"})
//   })

// }

module.exports = {
  getAll,
  getById,
  postTarefa,
  deleteTarefa,
  deleteTarefaConcluida,
  putTarefa,
};