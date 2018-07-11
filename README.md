# Vending Machine

Uma vending machine precisa de uma nova WEB API pois a atual será descontinuada. 

## Premissas
As seguintes premissas devem ser respeitadas:

* Ser instalada em qualquer serviço de nuvem pública (Amazon, Azure, Google Cloud, Digital Ocean, etc)
* Estar acessivel apenas pelas máquinas que enontram-se na empresa

## Regras de negócio
As seguintes regras de negócio devem ser mantidas:

* Cada cliente possuiu um cartão único
* Cada cliente possuiu uma recarga diária de R$ 5,00 (cinco reais)
* O cliente pode utilizar seu cartão quantas vezes quiser
* O valor do cartão não é acumulativo devendo ser zerado sempre que houver uma recarga
* As recargas devem ser liberadas a meia noite 
* As recargas só devem ser feitas após a inclusão do cartão

## Cenários de teste

Abaixo uma descrição dos cenários de teste ara garantir a funcionalidade da aplicação, esses cenários sao descritos em uma visão macro.

### Cenários Recarga diárias

#### Primeira utilização no dia
| **Dado que** | Colaborador não utilizou a máquina hoje |
| **Quando** | Inserir o cartão na máquina |
| **Então** | Será zerado o saldo anterior |
| **E** | Adicionado R$ 5,00 (cinco reais) de crédito para aquele dia |

#### Segunda utilização no dia
| **Dado que** | Colaborador já recarregou o cartão hoje |
| **Quando** | Inserir o cartão na máquina |
| **Então** | Será exibido o saldo atual |

### Cenários de Compra

#### Valor Produto <= Quantidade de créditos
| **Dado que** | Colaborador já realizou a recarga diaária |
| **Quando** | Inserir o cartão na máquina |
| **E** | Escolher um produto com valor menor que a quantidade de créditos |
| **Então** | O produto será liberado para retirada |
| **E** | Quantidade de produtos existem na máquina subtraido |

#### Valor Produto > Quantidade de créditos

| **Dado que** | Colaborador já realizou a recarga diaária |
| **Quando** | Inserir o cartão na máquina |
| **E** | Escolher um produto com valor maior que a quantidade de créditos |
| **Então** | O produto não estrará disponivel para compra |
